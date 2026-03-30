import { Link } from 'react-router-dom';

const SimpleHomePage = () => {
  // Mock data for demonstration
  const featured = [
    {
      id: '1',
      name: 'Bali',
      description: 'Tropical paradise with stunning beaches',
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800',
      rating: 4.8,
      price: 50
    },
    {
      id: '2', 
      name: 'Paris',
      description: 'City of Light with romantic atmosphere',
      image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=800',
      rating: 4.9,
      price: 120
    },
    {
      id: '3',
      name: 'Tokyo',
      description: 'Modern metropolis with rich culture',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
      rating: 4.7,
      price: 100
    }
  ];

  const features = [
    {
      title: 'Smart Search',
      description: 'Find destinations based on your preferences, budget, and travel dates',
      href: '/search',
      icon: '🔍'
    },
    {
      title: 'Explore Destinations',
      description: 'Discover amazing places with detailed information and local insights',
      href: '/destinations',
      icon: '🌍'
    },
    {
      title: 'Plan Itinerary',
      description: 'Create personalized travel plans with AI-powered recommendations',
      href: '/itinerary',
      icon: '📅'
    },
    {
      title: 'Weather Insights',
      description: 'Get real-time weather data to plan your perfect trip',
      href: '/weather',
      icon: '☁️'
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div style={{ textAlign: 'center', maxWidth: '800px', padding: '0 1rem' }}>
          <h1>Explore the World</h1>
          <p>Discover amazing destinations, plan perfect itineraries, and create unforgettable memories</p>
          
          {/* Quick Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Where to?"
              className="search-input"
            />
            <input
              type="date"
              className="search-input"
            />
            <select className="search-input">
              <option>2 Guests</option>
              <option>1 Guest</option>
              <option>3 Guests</option>
              <option>4+ Guests</option>
            </select>
            <Link
              to="/search"
              className="btn-primary"
              style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
              🔍 Search
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <h2 className="section-title">Everything You Need for the Perfect Trip</h2>
          
          <div className="grid grid-cols-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.href}
                className="card"
                style={{ 
                  textDecoration: 'none', 
                  color: 'inherit',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                  {feature.description}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', color: '#3b82f6', fontWeight: '500' }}>
                  <span>Learn more</span>
                  <span style={{ marginLeft: '0.5rem' }}>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="section" style={{ background: '#f9fafb' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
            <div>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1rem' }}>Featured Destinations</h2>
              <p style={{ fontSize: '1.25rem', color: '#6b7280' }}>
                Discover our most popular travel destinations
              </p>
            </div>
            <Link
              to="/destinations"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                color: '#3b82f6',
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-3">
            {featured.map((destination) => (
              <Link
                key={destination.id}
                to={`/destinations/${destination.id}`}
                className="destination-card"
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                />
                <div className="content">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                      {destination.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <span>⭐</span>
                      <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{destination.rating}</span>
                    </div>
                  </div>
                  <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                    {destination.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      From ${destination.price}/day
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', color: '#3b82f6', fontWeight: '500', fontSize: '0.875rem' }}>
                      <span>Explore</span>
                      <span style={{ marginLeft: '0.25rem' }}>→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section gradient-bg" style={{ color: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Trusted by Travelers Worldwide
            </h2>
            <p style={{ fontSize: '1.25rem', opacity: 0.9 }}>
              Join millions of satisfied customers who have discovered their perfect destinations with us
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '2rem',
            textAlign: 'center'
          }}>
            {[
              { value: '1M+', label: 'Happy Travelers' },
              { value: '500+', label: 'Destinations' },
              { value: '50K+', label: 'Trip Plans' },
              { value: '4.9', label: 'Average Rating' },
            ].map((stat, index) => (
              <div key={index}>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '1.125rem', opacity: 0.9 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ background: 'white' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '0 1rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>✈️</div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Ready to Start Your Adventure?
          </h2>
          <p style={{ fontSize: '1.25rem', color: '#6b7280', marginBottom: '2rem' }}>
            Join thousands of travelers who have discovered their perfect destinations with our intelligent travel platform
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            <Link
              to="/search"
              className="btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.125rem', padding: '1rem 2rem' }}
            >
              🔍 Start Planning
            </Link>
            <Link
              to="/destinations"
              className="btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.125rem', padding: '1rem 2rem' }}
            >
              📈 Explore Popular
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <div style={{ 
              width: '2rem', 
              height: '2rem', 
              background: 'linear-gradient(135deg, #3b82f6, #0ea5e9)', 
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem'
            }}>
              ✈️
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>TravelExplorer</span>
          </div>
          <p style={{ opacity: 0.8, marginBottom: '2rem' }}>
            Discover amazing destinations, plan perfect itineraries, and create unforgettable travel experiences.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <Link to="/destinations" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>Destinations</Link>
            <Link to="/search" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>Search</Link>
            <Link to="/itinerary" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>Plan Trip</Link>
            <Link to="/weather" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>Weather</Link>
          </div>
          <div style={{ opacity: 0.6, fontSize: '0.875rem' }}>
            © 2024 TravelExplorer. Made with ❤️ for travelers worldwide.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SimpleHomePage;
