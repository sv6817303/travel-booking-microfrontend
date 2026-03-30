import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { detailsService } from '../services/api';
import { Check, MapPin, Star } from 'lucide-react';

type Hotel = {
  id: string;
  name: string;
  location: string;
  rating: number;
  price: number;
  image: string;
  amenities?: string[];
  images?: string[];
  description?: string;
};

const HotelDetailsPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const adults = Number(searchParams.get('adults') || 2);
  const children = Number(searchParams.get('children') || 0);
  const rooms = Number(searchParams.get('rooms') || 1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hotel, setHotel] = useState<Hotel | null>(null);

  useEffect(() => {
    const run = async () => {
      if (!id) return;
      setLoading(true);
      setError('');
      try {
        const response = await detailsService.hotelById(id);
        const found = response?.data as Hotel | undefined;
        if (!found) {
          setError('Hotel not found.');
          setHotel(null);
          return;
        }
        setHotel({
          ...found,
          amenities: found.amenities || ['Free WiFi', 'Breakfast', 'Pool', 'Spa'],
          images: found.images || [found.image, found.image, found.image],
          description:
            found.description ||
            'Comfortable stay with modern rooms, great service, and a prime location close to popular attractions.',
        });
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
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-lg border border-[#e8e8e8] p-5 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4" />
            <div className="h-64 bg-gray-200 rounded mb-4" />
            <div className="h-4 bg-gray-200 rounded w-full mb-2" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="min-h-screen bg-[#f2f2f2] py-6">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-lg border border-[#e8e8e8] p-5">
            <div className="text-sm text-red-600">{error || 'Hotel not available.'}</div>
            <div className="mt-4">
              <Link to="/search/hotels">
                <Button className="font-bold">Back to hotels</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f2f2] py-6">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <Link
            to={`/search/hotels${location.search || ''}`}
            className="text-sm font-bold text-mmt-500 hover:underline"
          >
            ← Back to results
          </Link>
          <Button
            variant="outline"
            className="font-bold"
            onClick={() =>
              navigate(
                `/booking?type=hotel&id=${encodeURIComponent(hotel.id)}&checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(checkOut)}&adults=${adults}&children=${children}&rooms=${rooms}`
              )
            }
          >
            Book now
          </Button>
        </div>

        <div className="bg-white rounded-lg border border-[#e8e8e8] overflow-hidden shadow-sm">
          <div className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h1 className="text-2xl font-extrabold text-gray-900">{hotel.name}</h1>
                <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                  <MapPin className="w-4 h-4" />
                  {hotel.location}
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-2">
                <div className="bg-mmt-500 text-white px-2 py-1 rounded text-sm font-bold">
                  {hotel.rating} / 5
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={i < Math.floor(hotel.rating) ? 'w-4 h-4 fill-yellow-400 text-yellow-400' : 'w-4 h-4 text-gray-300'}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              {(hotel.images || []).slice(0, 3).map((src, idx) => (
                <img key={idx} src={src} alt={`${hotel.name} ${idx + 1}`} className="h-48 w-full object-cover rounded-md" />
              ))}
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h2 className="text-base font-bold text-gray-900 mb-2">About</h2>
                <p className="text-sm text-gray-600 leading-relaxed">{hotel.description}</p>

                <h2 className="text-base font-bold text-gray-900 mt-5 mb-2">Popular amenities</h2>
                <div className="flex flex-wrap gap-3">
                  {(hotel.amenities || []).map((a) => (
                    <div key={a} className="flex items-center gap-1 text-sm text-gray-700 bg-[#f8f8f8] border border-[#ebebeb] rounded-md px-3 py-2">
                      <Check className="w-4 h-4 text-green-600" />
                      {a}
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-1">
                <div className="border border-[#ebebeb] rounded-lg p-4 bg-[#fbfbfb]">
                  <p className="text-xs text-gray-500">Price per night</p>
                  <div className="text-2xl font-extrabold text-gray-900 mt-1">
                    ₹{Math.round(hotel.price * 90).toLocaleString('en-IN')}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Taxes extra</p>
                  <Button
                    className="w-full mt-4 font-bold"
                    onClick={() =>
                      navigate(
                        `/booking?type=hotel&id=${encodeURIComponent(hotel.id)}&checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(checkOut)}&adults=${adults}&children=${children}&rooms=${rooms}`
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
      </div>
    </div>
  );
};

export default HotelDetailsPage;

