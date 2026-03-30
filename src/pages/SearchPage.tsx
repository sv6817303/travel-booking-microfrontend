import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { searchService } from '../services/api';
import { Button } from '../components/ui/Button';
import { MapPin, Calendar, Users, Star, Check } from 'lucide-react';
import { cn } from '../lib/utils';

const SearchPage = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    rooms: 1,
    budget: { min: 0, max: 5000 }
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const destination = searchParams.get('destination') || '';
    const checkIn = searchParams.get('checkIn') || '';
    const checkOut = searchParams.get('checkOut') || '';
    const adults = parseInt(searchParams.get('adults') || '2');
    const children = parseInt(searchParams.get('children') || '0');
    const rooms = parseInt(searchParams.get('rooms') || '1');

    setFilters(prev => ({
      ...prev,
      destination,
      checkIn,
      checkOut,
      adults,
      children,
      rooms
    }));

    handleSearch(destination);
  }, [location.search]);

  const handleSearch = async (destination: string) => {
    setLoading(true);
    try {
      const response = await searchService.searchHotels({ location: destination });
      if (response.success) {
        // Enrich mock data with more MMT-style details if missing
        const enrichedData = response.data.map((hotel: any) => ({
          ...hotel,
          ratingCount: Math.floor(Math.random() * 1000) + 50,
          originalPrice: Math.floor(hotel.price * 1.2),
          discount: 20,
          amenities: hotel.amenities || ['Free WiFi', 'Breakfast', 'Pool', 'Spa'],
          tags: ['Couple Friendly', 'Best Safety']
        }));
        setResults(enrichedData);
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2] py-5 md:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Search summary strip — OTA-style */}
        <div className="bg-mmt-500 rounded-lg md:rounded-xl px-4 py-4 md:px-6 md:py-5 mb-5 text-white shadow-[0_2px_12px_rgba(0,140,255,0.35)] flex flex-wrap justify-between items-center gap-4">
          <div className="min-w-0">
            <h1 className="text-lg md:text-2xl font-bold mb-1 truncate">
              {filters.destination?.trim()
                ? `Hotels in ${filters.destination}`
                : 'Search hotels'}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-white/90 text-xs md:text-sm">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 shrink-0 opacity-90" />
                {filters.checkIn ? new Date(filters.checkIn).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Check-in'} —{' '}
                {filters.checkOut ? new Date(filters.checkOut).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Check-out'}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 shrink-0 opacity-90" />
                {filters.adults} Adults · {filters.children} Children · {filters.rooms} Room{filters.rooms !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
          <Link to="/">
            <Button
              variant="secondary"
              className="bg-white text-mmt-600 hover:bg-gray-50 border-0 font-bold text-sm shadow-none whitespace-nowrap"
            >
              Modify search
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 hidden lg:block">
            <div className="bg-white rounded-lg shadow-sm p-5 sticky top-[72px] border border-[#e8e8e8]">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-bold text-gray-900">Filters</h2>
                <button type="button" className="text-xs text-mmt-500 font-bold uppercase tracking-wide hover:underline">
                  Clear all
                </button>
              </div>

              <div className="space-y-8">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-4">
                    Price Range
                  </label>
                  <div className="space-y-2">
                    {['₹0 - ₹5,000', '₹5,000 - ₹15,000', '₹15,000 - ₹25,000', '₹25,000+'].map((range, idx) => (
                      <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-mmt-500 focus:ring-mmt-500" />
                        <span className="text-gray-600 group-hover:text-gray-900">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Star Rating */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-4">
                    Star Rating
                  </label>
                  <div className="space-y-2">
                    {[5, 4, 3].map((star) => (
                      <label key={star} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-mmt-500 focus:ring-mmt-500" />
                        <div className="flex items-center gap-1 text-gray-600 group-hover:text-gray-900">
                          <span className="font-medium">{star} Star</span>
                          <div className="flex">
                            {[...Array(star)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current text-yellow-400" />)}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-4">
                    Amenities
                  </label>
                  <div className="space-y-2">
                    {['WiFi', 'Breakfast', 'Pool', 'Spa', 'Parking'].map((item, idx) => (
                      <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-mmt-500 focus:ring-mmt-500" />
                        <span className="text-gray-600 group-hover:text-gray-900">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results List */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-[#e8e8e8] flex flex-wrap justify-between items-center gap-3">
              <h2 className="text-lg font-bold text-gray-900">
                {results.length} properties found
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by</span>
                <select className="border-none bg-transparent text-sm font-bold text-gray-900 focus:ring-0 cursor-pointer text-mmt-600">
                  <option>Popularity</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>User Rating</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="bg-white rounded-xl shadow-sm p-4 animate-pulse flex gap-4 h-64">
                    <div className="w-1/3 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1 space-y-4 py-2">
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-20 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {results.map((result) => (
                  <div key={result.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-[#e8e8e8] overflow-hidden flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="md:w-1/3 relative h-48 md:h-auto">
                      <img
                        src={result.image}
                        alt={result.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        {result.tags?.map((tag: string, idx: number) => (
                          <span key={idx} className="bg-white/90 backdrop-blur-sm px-2 py-1 text-xs font-bold text-gray-700 rounded uppercase tracking-wider">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-5 flex flex-col md:flex-row justify-between">
                      <div className="flex-1 pr-4 border-r border-gray-100 border-dashed">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={cn('w-3 h-3', i < Math.floor(result.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300')} />
                              ))}
                              <span className="text-xs text-gray-400">Hotel</span>
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 hover:text-mmt-500 transition-colors cursor-pointer">
                              {result.name}
                            </h3>
                            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                              <MapPin className="w-3 h-3" /> {result.location}
                            </p>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="bg-mmt-500 text-white px-2 py-1 rounded text-sm font-bold flex items-center gap-1">
                              {result.rating} <span className="text-[10px] font-normal">/5</span>
                            </div>
                            <span className="text-xs text-gray-500 mt-1">{result.ratingCount} Ratings</span>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-3">
                          {result.amenities?.slice(0, 4).map((amenity: string, idx: number) => (
                            <div key={idx} className="flex items-center gap-1 text-xs text-gray-600">
                              <Check className="w-3 h-3 text-green-500" />
                              {amenity}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Price Section */}
                      <div className="md:w-48 pl-4 flex flex-col justify-between items-end text-right mt-4 md:mt-0">
                        <div>
                          <div className="flex items-center justify-end gap-2 mb-1">
                            <span className="text-sm text-gray-400 line-through">₹{result.originalPrice?.toLocaleString('en-IN')}</span>
                            <span className="bg-red-50 text-red-600 text-xs font-bold px-1.5 py-0.5 rounded">{result.discount}% OFF</span>
                          </div>
                          <div className="text-2xl font-bold text-gray-900">
                            ₹{result.price?.toLocaleString('en-IN')}
                          </div>
                          <p className="text-xs text-gray-500">+ ₹800 taxes &amp; fees</p>
                          <p className="text-xs text-gray-500 mt-1">Per Night for {filters.adults} Adults</p>
                        </div>

                        <div className="w-full mt-4 space-y-2">
                          <Button className="w-full font-bold">View Details</Button>
                          <p className="text-xs text-center text-red-500 font-medium">Few rooms left!</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
