import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { searchFlights } from '../api';
import type { Flight, FlightsSearchParams } from '../types';
import { FlightCard } from '../components/FlightCard';
import { Button } from '../../../components/ui/Button';
import { Calendar, Loader2, Plane } from 'lucide-react';

function isNonEmpty(s: string | null): s is string {
  return Boolean(s && s.trim());
}

export default function FlightsSearchPage() {
  const [params] = useSearchParams();

  const from = params.get('from');
  const to = params.get('to');
  const date = params.get('date');

  const query: FlightsSearchParams | null = useMemo(() => {
    if (!isNonEmpty(from) || !isNonEmpty(to) || !isNonEmpty(date)) return null;
    return { from: from.trim(), to: to.trim(), date: date.trim() };
  }, [from, to, date]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState<Flight[]>([]);

  useEffect(() => {
    const run = async () => {
      if (!query) {
        setResults([]);
        return;
      }
      setLoading(true);
      setError('');
      try {
        const data = await searchFlights(query);
        setResults(data);
      } catch (e: any) {
        setError(e?.message || 'Failed to fetch flights');
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [query]);

  const heading = query ? `${query.from} → ${query.to}` : 'Search flights';

  return (
    <div className="min-h-screen bg-[#f2f2f2] py-5 md:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-mmt-500 rounded-lg md:rounded-xl px-4 py-4 md:px-6 md:py-5 mb-5 text-white shadow-[0_2px_12px_rgba(0,140,255,0.35)] flex flex-wrap justify-between items-center gap-4">
          <div className="min-w-0">
            <h1 className="text-lg md:text-2xl font-extrabold mb-1 truncate">{heading}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-white/90 text-xs md:text-sm">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 shrink-0 opacity-90" />
                {query?.date || 'Select date'}
              </span>
            </div>
          </div>
          <Link to="/flights">
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
              {loading ? <Loader2 className="w-4 h-4 animate-spin text-mmt-500" /> : <Plane className="w-4 h-4 text-mmt-500" />}
              {query ? 'One-way' : 'Enter search details'}
            </div>
          </div>

          {error && (
            <div className="bg-white rounded-lg shadow-sm border border-[#e8e8e8] p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          {!query && (
            <div className="bg-white rounded-lg shadow-sm border border-[#e8e8e8] p-6 text-center">
              <div className="text-gray-900 font-extrabold text-lg">Start a flight search</div>
              <p className="text-sm text-gray-600 mt-2">Enter From, To and Date to see results.</p>
              <div className="mt-4">
                <Link to="/flights">
                  <Button className="font-bold">Go to flight search</Button>
                </Link>
              </div>
            </div>
          )}

          {query && !loading && results.length === 0 && !error && (
            <div className="bg-white rounded-lg shadow-sm border border-[#e8e8e8] p-6 text-center">
              <div className="text-gray-900 font-extrabold text-lg">No flights found</div>
              <p className="text-sm text-gray-600 mt-2">
                Try changing cities. (Filtering is case-insensitive.)
              </p>
              <div className="mt-4">
                <Link to="/flights">
                  <Button variant="outline" className="font-bold">Modify search</Button>
                </Link>
              </div>
            </div>
          )}

          {results.map((f) => (
            <FlightCard
              key={f.id}
              flight={f}
              onSelect={() => {
                // MVP: Search → Results only (no booking flow)
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

