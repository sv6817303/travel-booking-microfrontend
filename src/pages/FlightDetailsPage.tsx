import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { detailsService } from '../services/api';
import { Calendar, Clock3, Plane } from 'lucide-react';

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

const FlightDetailsPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const date = searchParams.get('date') || '';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [flight, setFlight] = useState<Flight | null>(null);

  useEffect(() => {
    const run = async () => {
      if (!id) return;
      setLoading(true);
      setError('');
      try {
        const response = await detailsService.flightById(id);
        const found = response?.data as Flight | undefined;
        if (!found) {
          setError('Flight not found.');
          setFlight(null);
          return;
        }
        setFlight(found);
      } catch (e: any) {
        setError(e?.message || 'API not reachable. Start backend on port 5000.');
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f2f2f2] py-6">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg border border-[#e8e8e8] p-5 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4" />
            <div className="h-24 bg-gray-200 rounded mb-4" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !flight) {
    return (
      <div className="min-h-screen bg-[#f2f2f2] py-6">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg border border-[#e8e8e8] p-5">
            <div className="text-sm text-red-600">{error || 'Flight not available.'}</div>
            <div className="mt-4">
              <Link to="/search/flights">
                <Button className="font-bold">Back to flights</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f2f2] py-6">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <Link to={`/search/flights${location.search || ''}`} className="text-sm font-bold text-mmt-500 hover:underline">
            ← Back to results
          </Link>
          <Button
            variant="outline"
            className="font-bold"
            onClick={() =>
              navigate(
                `/booking?type=flight&id=${encodeURIComponent(flight.id)}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}`
              )
            }
          >
            Book
          </Button>
        </div>

        <div className="bg-white rounded-lg border border-[#e8e8e8] shadow-sm overflow-hidden">
          <div className="p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <h1 className="text-2xl font-extrabold text-gray-900 truncate">
                  {flight.departure.city} → {flight.arrival.city}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                  <span className="inline-flex items-center gap-1">
                    <Plane className="w-4 h-4 text-mmt-500" />
                    {flight.airline} · {flight.flightNumber}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-mmt-500" />
                    {formatDateLabel(date) || '—'}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="w-4 h-4 text-mmt-500" />
                    {flight.duration}
                  </span>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-xs text-gray-500">Fare</div>
                <div className="text-2xl font-extrabold text-gray-900">
                  ₹{Math.round(flight.price * 90).toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-[#ebebeb] rounded-lg p-4 bg-[#fbfbfb]">
                <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Departure</div>
                <div className="mt-1 text-lg font-bold text-gray-900">{flight.departure.time}</div>
                <div className="text-sm text-gray-600">
                  {flight.departure.code} · {flight.departure.city}
                </div>
              </div>
              <div className="border border-[#ebebeb] rounded-lg p-4 bg-[#fbfbfb]">
                <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Arrival</div>
                <div className="mt-1 text-lg font-bold text-gray-900">{flight.arrival.time}</div>
                <div className="text-sm text-gray-600">
                  {flight.arrival.code} · {flight.arrival.city}
                </div>
              </div>
            </div>

            <div className="mt-5 border border-[#ebebeb] rounded-lg p-4">
              <h2 className="text-base font-bold text-gray-900">Fare breakdown (MVP)</h2>
              <div className="mt-2 text-sm text-gray-600 space-y-1">
                <div className="flex justify-between">
                  <span>Base fare</span>
                  <span>₹{Math.round(flight.price * 80).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>₹{Math.round(flight.price * 10).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span>₹{Math.round(flight.price * 90).toLocaleString('en-IN')}</span>
                </div>
              </div>
              <Button
                className="w-full mt-4 font-bold"
                onClick={() =>
                  navigate(
                    `/booking?type=flight&id=${encodeURIComponent(flight.id)}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}`
                  )
                }
              >
                Continue to book
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetailsPage;

