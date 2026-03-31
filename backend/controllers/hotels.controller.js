const mockHotels = require('../data/hotels.mockData');

function normalize(s) {
  return String(s || '').trim().toLowerCase();
}

function uniq(arr) {
  return [...new Set(arr)];
}

// Simple in-memory cache to avoid hammering public endpoints
// Keyed by normalized location string.
const cache = new Map(); // key -> { ts, data }
const CACHE_TTL_MS = 5 * 60 * 1000;

function cacheGet(key) {
  const hit = cache.get(key);
  if (!hit) return null;
  if (Date.now() - hit.ts > CACHE_TTL_MS) return null;
  return hit.data;
}

function cacheSet(key, data) {
  cache.set(key, { ts: Date.now(), data });
}

function filterMockByCity(location) {
  const q = normalize(location);
  return mockHotels.filter((h) => (q ? normalize(h.city).includes(q) : true));
}

async function geocodeCity(location) {
  const q = String(location || '').trim();
  if (!q) return null;

  // Nominatim requires a valid User-Agent/Referer.
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(q)}`;
  const resp = await fetch(url, {
    headers: {
      'User-Agent': 'travel-booking-frontend/1.0 (hotel-search-mvp)',
      'Accept': 'application/json',
    },
  });
  if (!resp.ok) throw new Error(`Geocoding failed (${resp.status})`);
  const data = await resp.json();
  const first = Array.isArray(data) ? data[0] : null;
  if (!first) return null;
  return { lat: Number(first.lat), lon: Number(first.lon), displayName: String(first.display_name || q) };
}

async function overpassHotels(lat, lon) {
  // Search for hotels within 15km radius
  const radius = 15000;
  const query = `
    [out:json][timeout:25];
    (
      node["tourism"="hotel"](around:${radius},${lat},${lon});
      way["tourism"="hotel"](around:${radius},${lat},${lon});
      relation["tourism"="hotel"](around:${radius},${lat},${lon});
    );
    out center 40;
  `;

  const resp = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
      'User-Agent': 'travel-booking-frontend/1.0 (hotel-search-mvp)',
      'Accept': 'application/json',
    },
    body: query,
  });

  if (!resp.ok) throw new Error(`Overpass failed (${resp.status})`);
  const json = await resp.json();
  return Array.isArray(json?.elements) ? json.elements : [];
}

function toHotelCard(element, cityName) {
  const tags = element.tags || {};
  const name = tags.name || tags['brand'] || 'Hotel';

  // Amenities are not reliably present in OSM; we infer a few common ones.
  const inferredAmenities = uniq(
    [
      'wifi',
      tags.parking ? 'parking' : null,
      tags.restaurant ? 'restaurant' : null,
      tags.pool ? 'pool' : null,
      tags.gym ? 'gym' : null,
      tags.breakfast ? 'breakfast' : null,
    ].filter(Boolean)
  );

  // Generate stable-ish rating/price for MVP display (since OSM has no pricing).
  const seed = String(element.id);
  const seedNum = seed.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const rating = Math.round((3.6 + (seedNum % 14) / 10) * 10) / 10; // 3.6–5.0
  const price = 2500 + (seedNum % 55) * 120; // 2500–9100

  // Use a city-themed placeholder image (stable per city).
  const image = `https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60`;

  return {
    id: `OSM_${element.type}_${element.id}`,
    name,
    city: cityName,
    price,
    rating,
    amenities: inferredAmenities.length ? inferredAmenities : ['wifi'],
    image,
  };
}

exports.listHotels = async (req, res) => {
  const { location } = req.query;
  const provider = String(process.env.HOTELS_PROVIDER || 'osm').toLowerCase(); // osm | mock
  const key = normalize(location);

  try {
    const cached = cacheGet(`${provider}:${key}`);
    if (cached) return res.json({ success: true, data: cached });

    // If no location provided, keep it simple for MVP: return mock list.
    if (!String(location || '').trim()) {
      const data = filterMockByCity('');
      cacheSet(`${provider}:${key}`, data);
      return res.json({ success: true, data });
    }

    if (provider === 'mock') {
      const data = filterMockByCity(location);
      cacheSet(`${provider}:${key}`, data);
      return res.json({ success: true, data });
    }

    // Default: OSM live search (geocode → overpass)
    const geo = await geocodeCity(location);
    if (!geo) {
      const data = [];
      cacheSet(`${provider}:${key}`, data);
      return res.json({ success: true, data });
    }

    const elements = await overpassHotels(geo.lat, geo.lon);
    const cityName = String(location || '').trim();
    const data = elements
      .filter((e) => e?.tags?.name || e?.tags?.brand || e?.tags?.tourism === 'hotel')
      .slice(0, 30)
      .map((e) => toHotelCard(e, cityName));

    // If nothing found, fallback to mock city matches (better UX)
    const finalData = data.length ? data : filterMockByCity(location);

    cacheSet(`${provider}:${key}`, finalData);
    return res.json({ success: true, data: finalData });
  } catch (err) {
    // Never break the frontend: fallback to mock results.
    const data = filterMockByCity(location);
    return res.json({ success: true, data, fallback: true });
  }
};

exports.getHotelById = (req, res) => {
  const { id } = req.params;
  // For MVP: details are only available for mock dataset ids.
  const found = mockHotels.find((h) => h.id === id);
  if (!found) return res.status(404).json({ success: false, message: 'Hotel not found' });
  res.json({ success: true, data: found });
};

