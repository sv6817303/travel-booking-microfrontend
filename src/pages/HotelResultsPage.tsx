import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { searchService } from '../services/api';
import { Button } from '../components/ui/Button';
import { Calendar, Check, MapPin, Star, Users } from 'lucide-react';
import { cn } from '../lib/utils';

type Hotel = {
  id: string;
  name: string;
  location: string;
  rating: number;
  price: number;
  image: string;
  amenities?: string[];
};

function formatDateLabel(iso: string) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

const HotelResultsPage = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const destination = searchParams.get('destination') || '';
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const adults = Number(searchParams.get('adults') || 2);
  const children = Number(searchParams.get('children') || 0);
  const rooms = Number(searchParams.get('rooms') || 1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [results, setResults] = useState<Hotel[]>([]);

  const summary = useMemo(() => {
    const inLabel = formatDateLabel(checkIn) || 'Check-in';
    const outLabel = formatDateLabel(checkOut) || 'Check-out';
    return {
      title: destination.trim() ? `Hotels in ${destination}` : 'Search hotels',
      meta: `${inLabel} — ${outLabel} · ${adults} Adults · ${children} Children · ${rooms} Room${rooms !== 1 ? 's' : ''}`,
    };
  }, [destination, checkIn, checkOut, adults, children, rooms]);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await searchService.searchHotels({ location: destination });
        if (!response?.success) {
          setError('Search failed. Please try again.');
          setResults([]);
          return;
        }
        const enriched = (response.data as Hotel[]).map((hotel) => ({
          ...hotel,
          amenities: hotel.amenities || ['Free WiFi', 'Breakfast', 'Pool', 'Spa'],
        }));
        setResults(enriched);
      } catch (e: any) {
        setError(e?.message || 'API not reachable. Start backend on port 5000.');
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [location.search, destination]);

  return (
    <div className="min-h-screen bg-[#f2f2f2] py-5 md:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-mmt-500 rounded-lg md:rounded-xl px-4 py-4 md:px-6 md:py-5 mb-5 text-white shadow-[0_2px_12px_rgba(0,140,255,0.35)] flex flex-wrap justify-between items-center gap-4">
          <div className="min-w-0">
            <h1 className="text-lg md:text-2xl font-bold mb-1 truncate">{summary.title}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-white/90 text-xs md:text-sm">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 shrink-0 opacity-90" />
                {summary.meta.split(' · ')[0]}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 shrink-0 opacity-90" />
                {summary.meta.split(' · ').slice(1).join(' · ')}
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
          <div className="lg:col-span-1 hidden lg:block">
            <div className="bg-white rounded-lg shadow-sm p-5 sticky top-[72px] border border-[#e8e8e8]">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-bold text-gray-900">Filters</h2>
                <button type="button" className="text-xs text-mmt-500 font-bold uppercase tracking-wide hover:underline">
                  Clear all
                </button>
              </div>
              <div className="space-y-6 text-sm text-gray-600">
                <div>
                  <p className="font-bold text-gray-900 mb-3">Price Range</p>
                  <div className="space-y-2">
                    {['₹0 - ₹5,000', '₹5,000 - ₹15,000', '₹15,000 - ₹25,000', '₹25,000+'].map((range) => (
                      <label key={range} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-mmt-500 focus:ring-mmt-500" />
                        <span className="group-hover:text-gray-900">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-3">Star Rating</p>
                  <div className="space-y-2">
                    {[5, 4, 3].map((star) => (
                      <label key={star} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-mmt-500 focus:ring-mmt-500" />
                        <div className="flex items-center gap-1 group-hover:text-gray-900">
                          <span className="font-medium">{star} Star</span>
                          <div className="flex">
                            {[...Array(star)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-[#e8e8e8] flex flex-wrap justify-between items-center gap-3">
              <h2 className="text-lg font-bold text-gray-900">
                {loading ? 'Searching…' : `${results.length} properties found`}
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

            {error && (
              <div className="bg-white rounded-lg shadow-sm border border-[#e8e8e8] p-4 text-sm text-red-600">
                {error}
              </div>
            )}

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="bg-white rounded-lg shadow-sm p-4 animate-pulse flex gap-4 h-56 border border-[#e8e8e8]">
                    <div className="w-1/3 bg-gray-200 rounded-lg" />
                    <div className="flex-1 space-y-3 py-2">
                      <div className="h-5 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                      <div className="h-16 bg-gray-200 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {results.map((result) => (
                  <div
                    key={result.id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-[#e8e8e8] overflow-hidden flex flex-col md:flex-row"
                  >
                    <div className="md:w-1/3 relative h-48 md:h-auto">
                      <img src={result.image} alt={result.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 p-5 flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1 pr-0 md:pr-4 md:border-r border-gray-100 md:border-dashed">
                        <div className="flex justify-between items-start mb-2 gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={cn('w-3 h-3', i < Math.floor(result.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300')}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-gray-400">Hotel</span>
                            </div>
                            <Link to={`/hotel/${result.id}${location.search}`}>
                              <h3 className="text-lg md:text-xl font-bold text-gray-900 hover:text-mmt-500 transition-colors truncate">
                                {result.name}
                              </h3>
                            </Link>
                            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                              <MapPin className="w-3 h-3" /> {result.location}
                            </p>
                          </div>
                          <div className="flex flex-col items-end shrink-0">
                            <div className="bg-mmt-500 text-white px-2 py-1 rounded text-sm font-bold flex items-center gap-1">
                              {result.rating} <span className="text-[10px] font-normal">/5</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-3">
                          {(result.amenities || []).slice(0, 4).map((amenity, idx) => (
                            <div key={idx} className="flex items-center gap-1 text-xs text-gray-600">
                              <Check className="w-3 h-3 text-green-500" />
                              {amenity}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="md:w-52 flex flex-col justify-between items-end text-right">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">
                            ₹{Math.round(result.price * 90).toLocaleString('en-IN')}
                          </div>
                          <p className="text-xs text-gray-500">per night</p>
                        </div>
                        <div className="w-full mt-4 space-y-2">
                          <Link to={`/hotel/${result.id}${location.search}`} className="block">
                            <Button className="w-full font-bold">View details</Button>
                          </Link>
                          <Link
                            to={`/booking?type=hotel&id=${encodeURIComponent(result.id)}&checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(checkOut)}&adults=${adults}&children=${children}&rooms=${rooms}`}
                            className="block"
                          >
                            <Button variant="outline" className="w-full font-bold">
                              Book now
                            </Button>
                          </Link>
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

export default HotelResultsPage;

