import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { CheckCircle2 } from 'lucide-react';

const ConfirmationPage = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('bookingId') || '';

  return (
    <div className="min-h-screen bg-[#f2f2f2] py-10">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg border border-[#e8e8e8] shadow-sm p-6 text-center">
          <div className="mx-auto w-14 h-14 rounded-full bg-mmt-50 flex items-center justify-center text-mmt-500">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 mt-4">Booking confirmed</h1>
          <p className="text-sm text-gray-600 mt-2">
            Your booking has been confirmed successfully.
          </p>

          <div className="mt-4 border border-[#ebebeb] rounded-lg p-4 bg-[#fbfbfb]">
            <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Booking ID</div>
            <div className="text-lg font-extrabold text-gray-900 mt-1">{bookingId || '—'}</div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/profile">
              <Button className="font-bold w-full sm:w-auto">Go to My Trips</Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="font-bold w-full sm:w-auto">
                Book another trip
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;

