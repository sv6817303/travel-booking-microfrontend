exports.searchFlights = (req, res) => {
    const { from, to, date } = req.query;

    // Mock flight data
    const flights = [
        {
            id: 'f1',
            airline: 'SkyHigh Airways',
            flightNumber: 'SH101',
            departure: { city: from || 'New York', time: '10:00 AM', code: 'JFK' },
            arrival: { city: to || 'London', time: '10:00 PM', code: 'LHR' },
            price: 450,
            duration: '7h 00m'
        },
        {
            id: 'f2',
            airline: 'Oceanic Airlines',
            flightNumber: 'OA815',
            departure: { city: from || 'New York', time: '02:00 PM', code: 'JFK' },
            arrival: { city: to || 'London', time: '02:00 AM', code: 'LHR' },
            price: 520,
            duration: '7h 00m'
        },
        {
            id: 'f3',
            airline: 'Global Wings',
            flightNumber: 'GW505',
            departure: { city: from || 'New York', time: '06:00 PM', code: 'JFK' },
            arrival: { city: to || 'London', time: '06:00 AM', code: 'LHR' },
            price: 380,
            duration: '7h 00m'
        }
    ];

    res.json({ success: true, data: flights });
};

exports.searchHotels = (req, res) => {
    const { location } = req.query;

    // Mock hotel data
    const hotels = [
        {
            id: 'h1',
            name: 'Grand Plaza Hotel',
            location: location || 'City Center',
            rating: 4.8,
            price: 199,
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
            amenities: ['Pool', 'Spa', 'WiFi']
        },
        {
            id: 'h2',
            name: 'Cozy Stay Inn',
            location: location || 'Downtown',
            rating: 4.2,
            price: 89,
            image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400',
            amenities: ['WiFi', 'Breakfast']
        },
        {
            id: 'h3',
            name: 'Luxury Resort & Spa',
            location: location || 'Beachfront',
            rating: 4.9,
            price: 450,
            image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400',
            amenities: ['Pool', 'Spa', 'Gym', 'Beach Access']
        }
    ];

    res.json({ success: true, data: hotels });
};

// MVP compatibility: keep legacy `/api/search/*` but align output shape with new endpoints when possible.
// (The dedicated controllers under /api/flights and /api/hotels are the canonical source.)
