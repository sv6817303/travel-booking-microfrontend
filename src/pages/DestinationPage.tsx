import { useState } from 'react';

const DestinationPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Destinations', icon: '🌎' },
    { id: 'beach', name: 'Beach', icon: '🏖️' },
    { id: 'mountain', name: 'Mountain', icon: '🏔️' },
    { id: 'city', name: 'City', icon: '🏙️' },
    { id: 'cultural', name: 'Cultural', icon: '🏛️' },
    { id: 'adventure', name: 'Adventure', icon: '🎒' }
  ];

  const destinations = [
    {
      id: '1',
      name: 'Santorini',
      country: 'Greece',
      category: 'beach',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500',
      rating: 4.9,
      price: 180,
      description: 'Beautiful Greek island with stunning sunsets and white-washed buildings',
      highlights: ['Sunset Views', 'Blue Domed Churches', 'Wine Tasting', 'Volcanic Beaches']
    },
    {
      id: '2',
      name: 'Kyoto',
      country: 'Japan',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=500',
      rating: 4.8,
      price: 120,
      description: 'Ancient capital with beautiful temples, gardens, and traditional culture',
      highlights: ['Temples & Shrines', 'Cherry Blossoms', 'Traditional Gardens', 'Geisha Districts']
    },
    {
      id: '3',
      name: 'Banff National Park',
      country: 'Canada',
      category: 'mountain',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500',
      rating: 4.7,
      price: 90,
      description: 'Stunning mountain scenery with pristine lakes and abundant wildlife',
      highlights: ['Lake Louise', 'Mountain Hiking', 'Wildlife Viewing', 'Scenic Drives']
    },
    {
      id: '4',
      name: 'New York City',
      country: 'USA',
      category: 'city',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500',
      rating: 4.6,
      price: 200,
      description: 'The city that never sleeps with world-class attractions and culture',
      highlights: ['Times Square', 'Central Park', 'Museums', 'Broadway Shows']
    },
    {
      id: '5',
      name: 'Queenstown',
      country: 'New Zealand',
      category: 'adventure',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500',
      rating: 4.8,
      price: 150,
      description: 'Adventure capital with stunning landscapes and extreme sports',
      highlights: ['Bungee Jumping', 'Skydiving', 'Milford Sound', 'Lake Wakatipu']
    },
    {
      id: '6',
      name: 'Bali',
      country: 'Indonesia',
      category: 'beach',
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=500',
      rating: 4.7,
      price: 60,
      description: 'Tropical paradise with beautiful beaches, temples, and rice terraces',
      highlights: ['Beaches', 'Rice Terraces', 'Temples', 'Spa Treatments']
    }
  ];

  const filteredDestinations = selectedCategory === 'all' 
    ? destinations 
    : destinations.filter(dest => dest.category === selectedCategory);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '2rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            🌍 Explore Amazing Destinations
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
            Discover breathtaking places around the world and plan your next adventure
          </p>
        </div>

        {/* Category Filter */}
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            gap: '1rem',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  border: '2px solid',
                  borderColor: selectedCategory === category.id ? '#3b82f6' : '#e5e7eb',
                  borderRadius: '2rem',
                  backgroundColor: selectedCategory === category.id ? '#3b82f6' : 'white',
                  color: selectedCategory === category.id ? 'white' : '#6b7280',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.borderColor = '#3b82f6';
                    e.currentTarget.style.color = '#3b82f6';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.color = '#6b7280';
                  }
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '2rem' }}>
          {filteredDestinations.map((destination) => (
            <div key={destination.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ position: 'relative' }}>
                <img
                  src={destination.image}
                  alt={destination.name}
                  style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  <span>⭐</span>
                  <span style={{ fontWeight: '600', fontSize: '0.875rem' }}>{destination.rating}</span>
                </div>
              </div>
              
              <div style={{ padding: '1.5rem' }}>
                <div style={{ marginBottom: '0.75rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, marginBottom: '0.25rem' }}>
                    {destination.name}
                  </h3>
                  <p style={{ color: '#6b7280', margin: 0, fontSize: '0.875rem' }}>
                    📍 {destination.country}
                  </p>
                </div>
                
                <p style={{ color: '#4b5563', marginBottom: '1rem', lineHeight: '1.5' }}>
                  {destination.description}
                </p>
                
                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
                    Highlights:
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {destination.highlights.map((highlight, index) => (
                      <span
                        key={index}
                        style={{
                          padding: '0.25rem 0.75rem',
                          backgroundColor: '#f3f4f6',
                          color: '#6b7280',
                          borderRadius: '1rem',
                          fontSize: '0.75rem',
                          fontWeight: '500'
                        }}
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6' }}>
                      ${destination.price}
                    </span>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>/night</span>
                  </div>
                  
                  <button 
                    className="btn-primary"
                    style={{ padding: '0.75rem 1.5rem' }}
                  >
                    Explore
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              No destinations found
            </h3>
            <p style={{ color: '#6b7280' }}>
              Try selecting a different category or check back later for more destinations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationPage;
