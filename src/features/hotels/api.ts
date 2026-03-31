import { searchService } from '../../services/api';
import type { Hotel } from './types';

export async function searchHotelsByLocation(location: string): Promise<Hotel[]> {
  const resp = await searchService.searchHotels({ location });
  if (!resp?.success) return [];
  return normalizeHotels(resp.data || []);
}

function normalizeHotels(raw: any[]): Hotel[] {
  return raw.map((h: any) => {
    // Supports both legacy {location, amenities: ['WiFi']} and new MVP {city, amenities: ['wifi']}
    const amenitiesRaw: string[] = Array.isArray(h?.amenities) ? h.amenities : [];
    const normalizedAmenities = amenitiesRaw
      .map((a) => String(a).trim().toLowerCase())
      .map((a) => (a === 'free wifi' ? 'wifi' : a))
      .filter(Boolean);

    return {
      id: String(h.id ?? ''),
      name: String(h.name ?? ''),
      city: String(h.city ?? h.location ?? ''),
      price: Number(h.price ?? 0),
      rating: Number(h.rating ?? 0),
      amenities: normalizedAmenities as any,
      image: String(h.image ?? ''),
    };
  });
}

