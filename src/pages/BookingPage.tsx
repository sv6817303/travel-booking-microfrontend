import { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { authService } from '../services/api';

type BookingType = 'hotel' | 'flight';

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const type = (searchParams.get('type') || '') as BookingType;
  const id = searchParams.get('id') || '';

  const summary = useMemo(() => {
    if (type === 'hotel') {
      return {
        title: 'Review your hotel booking',
        lines: [
          { k: 'Hotel ID', v: id },
          { k: 'Check-in', v: searchParams.get('checkIn') || '—' },
          { k: 'Check-out', v: searchParams.get('checkOut') || '—' },
          { k: 'Guests', v: `${searchParams.get('adults') || 2} Adults, ${searchParams.get('children') || 0} Children` },
          { k: 'Rooms', v: searchParams.get('rooms') || '1' },
        ],
      };
    }
    if (type === 'flight') {
      return {
        title: 'Review your flight booking',
        lines: [
          { k: 'Flight ID', v: id },
          { k: 'From', v: searchParams.get('from') || '—' },
          { k: 'To', v: searchParams.get('to') || '—' },
          { k: 'Date', v: searchParams.get('date') || '—' },
        ],
      };
    }
    return { title: 'Booking', lines: [{ k: 'Item', v: 'Invalid booking request' }] };
  }, [type, id, searchParams]);

  const currentUser = authService.getCurrentUser();

  const [form, setForm] = useState({
    fullName: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
  });
  const [error, setError] = useState('');

  const canContinue = Boolean(type && id && form.fullName.trim() && form.email.trim() && form.phone.trim());

  const onContinue = () => {
    setError('');
    if (!canContinue) {
      setError('Please fill all traveller details.');
      return;
    }

    const payload = {
      type,
      itemId: id,
      traveller: form,
      meta: Object.fromEntries(searchParams.entries()),
    };

    navigate(`/payment?${new URLSearchParams({ draft: JSON.stringify(payload) }).toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2] py-6">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <Link to="/" className="text-sm font-bold text-mmt-500 hover:underline">
            ← Back to home
          </Link>
          <Link to="/profile">
            <Button variant="ghost" className="font-bold">
              My trips
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg border border-[#e8e8e8] shadow-sm overflow-hidden">
          <div className="p-5 border-b border-[#efefef]">
            <h1 className="text-2xl font-extrabold text-gray-900">{summary.title}</h1>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {summary.lines.map((l) => (
                <div key={l.k} className="flex items-center justify-between gap-3 bg-[#fbfbfb] border border-[#f0f0f0] rounded-md px-3 py-2">
                  <span className="text-gray-500 font-semibold">{l.k}</span>
                  <span className="text-gray-900 font-bold truncate">{l.v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5">
            <h2 className="text-base font-bold text-gray-900 mb-3">Traveller details</h2>
            {error && <div className="mb-3 text-sm text-red-600">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Full name</label>
                <Input value={form.fullName} onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Email</label>
                <Input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-600 mb-1">Phone</label>
                <Input value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} placeholder="10-digit mobile number" />
              </div>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:justify-end">
              <Link to="/">
                <Button variant="outline" className="w-full sm:w-auto font-bold">
                  Cancel
                </Button>
              </Link>
              <Button className="w-full sm:w-auto font-bold" onClick={onContinue} disabled={!canContinue}>
                Continue to payment
              </Button>
            </div>

            <p className="mt-4 text-xs text-gray-500">
              MVP note: payment is mocked for now; the next step is wiring real payments and storing bookings in DB.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;

