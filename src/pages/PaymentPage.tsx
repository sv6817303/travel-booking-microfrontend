import { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { bookingService } from '../services/api';

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const draftRaw = searchParams.get('draft') || '';
  const draft = useMemo(() => {
    try {
      return draftRaw ? JSON.parse(draftRaw) : null;
    } catch {
      return null;
    }
  }, [draftRaw]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const payNow = async () => {
    setLoading(true);
    setError('');
    try {
      const resp = await bookingService.create(draft);
      const bookingId = resp?.data?.bookingId;
      if (!bookingId) throw new Error('Booking failed');
      navigate(`/confirmation?bookingId=${encodeURIComponent(bookingId)}`);
    } catch (e: any) {
      setError(e?.message || 'Payment failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!draft) {
    return (
      <div className="min-h-screen bg-[#f2f2f2] py-6">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-lg border border-[#e8e8e8] p-5">
            <div className="text-sm text-red-600">Missing booking draft. Please start again.</div>
            <div className="mt-4">
              <Link to="/">
                <Button className="font-bold">Go to home</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f2f2] py-6">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <Link to="/" className="text-sm font-bold text-mmt-500 hover:underline">
            ← Back to home
          </Link>
        </div>

        <div className="bg-white rounded-lg border border-[#e8e8e8] shadow-sm overflow-hidden">
          <div className="p-5 border-b border-[#efefef]">
            <h1 className="text-2xl font-extrabold text-gray-900">Payment (MVP)</h1>
            <p className="text-sm text-gray-600 mt-1">
              This is a mock payment screen. Clicking Pay will confirm the booking.
            </p>
          </div>

          <div className="p-5">
            {error && <div className="mb-3 text-sm text-red-600">{error}</div>}

            <div className="border border-[#ebebeb] rounded-lg p-4 bg-[#fbfbfb] text-sm text-gray-700">
              <div className="flex justify-between gap-3">
                <span className="font-semibold text-gray-500">Booking type</span>
                <span className="font-bold text-gray-900">{draft.type}</span>
              </div>
              <div className="flex justify-between gap-3 mt-2">
                <span className="font-semibold text-gray-500">Item</span>
                <span className="font-bold text-gray-900">{draft.itemId}</span>
              </div>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:justify-end">
              <Link to="/" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full font-bold">
                  Cancel
                </Button>
              </Link>
              <Button className="w-full sm:w-auto font-bold" onClick={payNow} isLoading={loading}>
                Pay &amp; confirm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

