import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { searchService } from '../services/api';
import { Button } from '../components/ui/Button';
import { ArrowRight, Calendar, Clock3, Plane, Repeat2 } from 'lucide-react';

type Flight = {
  id: string;
  airline: string;
  flightNumber: string;
  departure: { city: string; time: string; code: string };
  arrival: { city: string; time: string; code: string };
  price: number;
  duration: string;
};

function formatDateLabel(iso: string) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

const FlightResultsPage = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const date = searchParams.get('date') || '';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState<Flight[]>([]);

  const summary = useMemo(() => {
    const dateLabel = formatDateLabel(date) || 'Select date';
    const title = from.trim() && to.trim() ? `${from} → ${to}` : 'Search flights';
    return { title, meta: `${dateLabel} · One-way` };
  }, [from, to, date]);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await searchService.searchFlights({ from, to, date });
        if (!response?.success) {
          setError('Search failed. Please try again.');
          setResults([]);
          return;
        }
        // Legacy page retained but no longer routed. Keep it harmless if imported elsewhere.
        setResults((response.data || []) as Flight[]);
      } catch (e: any) {
        setError(e?.message || 'API not reachable. Start backend on port 5000.');
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [location.search, from, to, date]);

  return (
    <div className="min-h-screen bg-[#f2f2f2] py-5 md:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-mmt-500 rounded-lg md:rounded-xl px-4 py-4 md:px-6 md:py-5 mb-5 text-white shadow-[0_2px_12px_rgba(0,140,255,0.35)] flex flex-wrap justify-between items-center gap-4">
          <div className="min-w-0">
            <h1 className="text-lg md:text-2xl font-bold mb-1 truncate">{summary.title}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-white/90 text-xs md:text-sm">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 shrink-0 opacity-90" />
                {summary.meta}
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

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-[#e8e8e8] flex flex-wrap justify-between items-center gap-3">
            <h2 className="text-lg font-bold text-gray-900">
              {loading ? 'Searching…' : `${results.length} flights found`}
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Repeat2 className="w-4 h-4 text-mmt-500" />
              Sort: Cheapest
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
                <div key={n} className="bg-white rounded-lg shadow-sm border border-[#e8e8e8] p-4 animate-pulse">
                  <div className="h-5 bg-gray-200 rounded w-1/3 mb-3" />
                  <div className="h-10 bg-gray-200 rounded w-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((f) => (
                <div
                  key={f.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-[#e8e8e8] p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-4"
                >
                  <div className="flex items-center gap-3 min-w-[220px]">
                    <div className="w-10 h-10 rounded-lg bg-mmt-50 flex items-center justify-center text-mmt-500">
                      <Plane className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-gray-900 truncate">{f.airline}</div>
                      <div className="text-xs text-gray-500">{f.flightNumber}</div>
                    </div>
                  </div>

                  <div className="flex-1 grid grid-cols-3 items-center gap-3">
                    <div>
                      <div className="text-sm font-bold text-gray-900">{f.departure.time}</div>
                      <div className="text-xs text-gray-500">
                        {f.departure.code} · {f.departure.city}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                        <Clock3 className="w-3.5 h-3.5" />
                        {f.duration}
                      </div>
                      <div className="text-xs text-gray-400 mt-1 flex items-center justify-center gap-1">
                        <span className="h-px w-10 bg-gray-300" />
                        <ArrowRight className="w-3.5 h-3.5" />
                        <span className="h-px w-10 bg-gray-300" />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">{f.arrival.time}</div>
                      <div className="text-xs text-gray-500">
                        {f.arrival.code} · {f.arrival.city}
                      </div>
                    </div>
                  </div>

                  <div className="md:w-56 flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3">
                    <div className="text-xl font-bold text-gray-900">
                      ₹{Math.round(f.price * 90).toLocaleString('en-IN')}
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/flight/${f.id}${location.search}`}>
                        <Button className="font-bold">View</Button>
                      </Link>
                      <Link
                        to={`/booking?type=flight&id=${encodeURIComponent(f.id)}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}`}
                      >
                        <Button variant="outline" className="font-bold">
                          Book
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightResultsPage;

