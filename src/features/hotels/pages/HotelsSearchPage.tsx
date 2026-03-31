import { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { searchHotelsByLocation } from '../api';
import type { Hotel, HotelFilters, HotelSort, HotelsQuery } from '../types';
import { FiltersSidebar } from '../components/FiltersSidebar';
import { HotelCard } from '../components/HotelCard';
import { Button } from '../../../components/ui/Button';
import { Calendar, Users } from 'lucide-react';

function formatDateLabel(iso: string) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

const emptyFilters: HotelFilters = { priceRange: [], ratings: [], amenities: [] };

function matchesPrice(price: number, bucket: HotelFilters['priceRange'][number]) {
  if (bucket === '0-3000') return price >= 0 && price < 3000;
  if (bucket === '3000-5000') return price >= 3000 && price < 5000;
  if (bucket === '5000-8000') return price >= 5000 && price < 8000;
  return price >= 8000;
}

function applyFilters(hotels: Hotel[], filters: HotelFilters) {
  return hotels.filter((h) => {
    if (filters.priceRange.length > 0 && !filters.priceRange.some((b) => matchesPrice(h.price, b))) {
      return false;
    }
    if (filters.ratings.length > 0 && !filters.ratings.some((r) => Math.floor(h.rating) >= r)) {
      return false;
    }
    if (filters.amenities.length > 0 && !filters.amenities.every((a) => h.amenities.includes(a))) {
      return false;
    }
    return true;
  });
}

function sortHotels(hotels: Hotel[], sort: HotelSort) {
  const arr = [...hotels];
  if (sort === 'price_asc') return arr.sort((a, b) => a.price - b.price);
  if (sort === 'price_desc') return arr.sort((a, b) => b.price - a.price);
  if (sort === 'rating_desc') return arr.sort((a, b) => b.rating - a.rating);
  return arr; // popularity placeholder
}

export default function HotelsSearchPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const query: HotelsQuery = useMemo(
    () => ({
      destination: params.get('destination') || '',
      checkIn: params.get('checkIn') || '',
      checkOut: params.get('checkOut') || '',
      adults: Number(params.get('adults') || 2),
      children: Number(params.get('children') || 0),
      rooms: Number(params.get('rooms') || 1),
    }),
    [params]
  );

  const [filters, setFilters] = useState<HotelFilters>(emptyFilters);
  const [sort, setSort] = useState<HotelSort>('popularity');

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['hotels', query.destination],
    queryFn: () => searchHotelsByLocation(query.destination),
    enabled: true,
    staleTime: 1000 * 60 * 5,
  });

  const baseHotels = data || [];
  const filteredHotels = useMemo(() => sortHotels(applyFilters(baseHotels, filters), sort), [baseHotels, filters, sort]);

  const summaryTitle = query.destination.trim() ? `Hotels in ${query.destination}` : 'Search hotels';
  const inLabel = formatDateLabel(query.checkIn) || 'Check-in';
  const outLabel = formatDateLabel(query.checkOut) || 'Check-out';

  return (
    <div className="min-h-screen bg-[#f2f2f2] py-5 md:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-mmt-500 rounded-lg md:rounded-xl px-4 py-4 md:px-6 md:py-5 mb-5 text-white shadow-[0_2px_12px_rgba(0,140,255,0.35)] flex flex-wrap justify-between items-center gap-4">
          <div className="min-w-0">
            <h1 className="text-lg md:text-2xl font-extrabold mb-1 truncate">{summaryTitle}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-white/90 text-xs md:text-sm">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 shrink-0 opacity-90" />
                {inLabel} — {outLabel}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 shrink-0 opacity-90" />
                {query.adults} Adults · {query.children} Children · {query.rooms} Room{query.rooms !== 1 ? 's' : ''}
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
            <FiltersSidebar value={filters} onChange={setFilters} onClear={() => setFilters(emptyFilters)} />
          </div>

          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-[#e8e8e8] flex flex-wrap justify-between items-center gap-3">
              <h2 className="text-lg font-bold text-gray-900">
                {isLoading ? 'Searching…' : `${filteredHotels.length} hotels found`}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as HotelSort)}
                  className="border-none bg-transparent text-sm font-bold text-gray-900 focus:ring-0 cursor-pointer text-mmt-600"
                >
                  <option value="popularity">Popularity</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating_desc">Rating: High to Low</option>
                </select>
              </div>
            </div>

            {isError && (
              <div className="bg-white rounded-lg shadow-sm border border-[#e8e8e8] p-4 text-sm text-red-600">
                {(error as any)?.message || 'Failed to load hotels'}
              </div>
            )}

            {isLoading && (
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
            )}

            {!isLoading && !isError && filteredHotels.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-[#e8e8e8] p-6 text-center">
                <div className="text-gray-900 font-extrabold text-lg">No hotels found</div>
                <p className="text-sm text-gray-600 mt-2">Try a different city or clear filters.</p>
                <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="outline" className="font-bold" onClick={() => setFilters(emptyFilters)}>
                    Clear filters
                  </Button>
                  <Button className="font-bold" onClick={() => navigate('/')}>
                    Modify search
                  </Button>
                </div>
              </div>
            )}

            {filteredHotels.map((h) => (
              <HotelCard key={h.id} hotel={h} onViewDetails={(id) => navigate(`/hotel/${id}${window.location.search}`)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

