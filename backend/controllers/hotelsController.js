const hotels = [
  {
    id: 'h1',
    name: 'Grand Plaza Hotel',
    location: 'Mumbai',
    rating: 4.8,
    price: 199,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
      'https://images.unsplash.com/photo-1551887373-6d4c6f8a9bf4?w=1200',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200',
    ],
    amenities: ['Pool', 'Spa', 'WiFi', 'Breakfast'],
    description: 'A premium stay in the heart of the city with spacious rooms and top-class hospitality.',
  },
  {
    id: 'h2',
    name: 'Cozy Stay Inn',
    location: 'Bengaluru',
    rating: 4.2,
    price: 89,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200',
      'https://images.unsplash.com/photo-1551887373-6d4c6f8a9bf4?w=1200',
    ],
    amenities: ['WiFi', 'Breakfast', 'Parking'],
    description: 'Comfortable rooms, friendly staff, and great connectivity for business and leisure travelers.',
  },
  {
    id: 'h3',
    name: 'Luxury Resort & Spa',
    location: 'Goa',
    rating: 4.9,
    price: 450,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
    ],
    amenities: ['Pool', 'Spa', 'Gym', 'Beach Access', 'WiFi'],
    description: 'A beachfront resort experience with luxury amenities, spa treatments, and curated dining.',
  },
];

function normalize(s) {
  return String(s || '').trim().toLowerCase();
}

exports.listHotels = (req, res) => {
  const { location } = req.query;
  const q = normalize(location);
  const filtered = hotels.filter((h) => {
    if (!q) return true;
    const blob = `${normalize(h.location)} ${normalize(h.name)}`;
    return blob.includes(q);
  });
  res.json({ success: true, data: filtered });
};

exports.getHotelById = (req, res) => {
  const { id } = req.params;
  const found = hotels.find((h) => h.id === id);
  if (!found) return res.status(404).json({ success: false, message: 'Hotel not found' });
  res.json({ success: true, data: found });
};

