import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { authService, bookingService } from '../services/api';
import { useEffect, useState } from 'react';

type StoredBooking = {
  bookingId: string;
  type: 'hotel' | 'flight';
  itemId: string;
  status: string;
  createdAt: string;
  traveller?: { fullName?: string; email?: string; phone?: string };
  meta?: Record<string, string>;
};

const ProfilePage = () => {
  const user = authService.getCurrentUser();
  const [bookings, setBookings] = useState<StoredBooking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError('');
      try {
        const resp = await bookingService.list(user?.email ? { email: user.email } : {});
        setBookings(resp?.data || []);
      } catch (e: any) {
        setError(e?.message || 'Could not load bookings. Start backend on port 5000.');
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [user?.email]);

  return (
    <div className="min-h-screen bg-[#f2f2f2] py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">My Trips</h1>
            <p className="text-sm text-gray-600 mt-1">
              {user ? `Signed in as ${user.email}` : 'Not signed in (MVP uses local storage)'}
            </p>
          </div>
          <Link to="/">
            <Button className="font-bold">Book a trip</Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg border border-[#e8e8e8] shadow-sm overflow-hidden">
          <div className="p-5 border-b border-[#efefef]">
            <h2 className="text-base font-bold text-gray-900">Bookings</h2>
          </div>
          <div className="p-5">
            {error && <div className="mb-3 text-sm text-red-600">{error}</div>}
            {loading ? (
              <div className="text-sm text-gray-600">Loading your bookings…</div>
            ) : bookings.length === 0 ? (
              <div className="text-sm text-gray-600">
                No bookings yet. Search flights/hotels and complete a mock payment to see your trips here.
              </div>
            ) : (
              <div className="space-y-3">
                {bookings.map((b) => (
                  <div
                    key={b.bookingId}
                    className="border border-[#ebebeb] rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
                        {b.type} · {b.status}
                      </div>
                      <div className="text-lg font-extrabold text-gray-900 truncate">{b.bookingId}</div>
                      <div className="text-sm text-gray-600">
                        Item: <span className="font-semibold text-gray-800">{b.itemId}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Created: {new Date(b.createdAt).toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/confirmation?bookingId=${encodeURIComponent(b.bookingId)}`}>
                        <Button variant="outline" className="font-bold">
                          View
                        </Button>
                      </Link>
                      <Link to={b.type === 'hotel' ? `/hotel/${b.itemId}` : `/flight/${b.itemId}`}>
                        <Button className="font-bold">Details</Button>
                      </Link>
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

export default ProfilePage;
