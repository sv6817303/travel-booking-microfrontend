import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Hotel, Car, Bus, MapPin, Calendar, ArrowRightLeft } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from './ui/Button';
import { cn } from '../lib/utils';
import { GuestSelector } from './GuestSelector';
import { isNonEmpty } from '../shared/utils/validation';

type SearchType = 'flights' | 'hotels' | 'cabs' | 'buses';

const SearchWidget = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<SearchType>('flights');

  const [hotelLocation, setHotelLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState<Date | null>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(
    new Date(Date.now() + 86400000)
  );
  const [guests, setGuests] = useState({ adults: 2, children: 0, rooms: 1 });

  const [flightFrom, setFlightFrom] = useState('');
  const [flightTo, setFlightTo] = useState('');
  const [flightDate, setFlightDate] = useState<Date | null>(new Date());
  const [error, setError] = useState<string>('');

  const tabs = [
    { id: 'flights' as const, label: 'Flights', icon: Plane },
    { id: 'hotels' as const, label: 'Hotels', icon: Hotel },
    { id: 'cabs' as const, label: 'Cabs', icon: Car },
    { id: 'buses' as const, label: 'Buses', icon: Bus },
  ];

  const swapFlightCities = () => {
    setFlightFrom(flightTo);
    setFlightTo(flightFrom);
  };

  const handleSearch = () => {
    setError('');
    if (activeTab === 'hotels') {
      if (!isNonEmpty(hotelLocation)) {
        setError('Please enter a destination city.');
        return;
      }
      if (!checkInDate || !checkOutDate) {
        setError('Please select check-in and check-out dates.');
        return;
      }
      if (checkInDate && checkOutDate && checkOutDate <= checkInDate) {
        setError('Check-out date must be after check-in date.');
        return;
      }
      const params = new URLSearchParams({
        destination: hotelLocation,
        checkIn: checkInDate?.toISOString() || '',
        checkOut: checkOutDate?.toISOString() || '',
        adults: guests.adults.toString(),
        children: guests.children.toString(),
        rooms: guests.rooms.toString(),
      });
      navigate(`/search/hotels?${params.toString()}`);
    } else if (activeTab === 'flights') {
      if (!isNonEmpty(flightFrom) || !isNonEmpty(flightTo)) {
        setError('Please enter both From and To cities.');
        return;
      }
      if (flightFrom.trim().toLowerCase() === flightTo.trim().toLowerCase()) {
        setError('From and To cannot be the same.');
        return;
      }
      if (!flightDate) {
        setError('Please select a departure date.');
        return;
      }
      const params = new URLSearchParams({
        from: flightFrom,
        to: flightTo,
        date: flightDate?.toISOString() || '',
      });
      navigate(`/search/flights?${params.toString()}`);
    } else {
      navigate('/search/hotels');
    }
  };

  const fieldShell =
    'border border-[#d8d8d8] rounded-lg px-3 py-2.5 h-[52px] flex items-center bg-white hover:border-mmt-500/40 transition-colors focus-within:border-mmt-500 focus-within:ring-1 focus-within:ring-mmt-500';

  return (
    <div className="max-w-6xl mx-auto -mt-16 md:-mt-20 relative z-20 px-2 sm:px-0">
      <div className="bg-white rounded-xl md:rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-[#e8e8e8] overflow-hidden">
        <div className="flex overflow-x-auto border-b border-[#ebebeb] bg-[#fafafa] [scrollbar-width:thin]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center justify-center gap-2 min-w-[100px] flex-1 sm:flex-none sm:min-w-[120px] px-4 py-3.5 text-sm font-bold transition-colors relative whitespace-nowrap',
                  isActive
                    ? 'text-mmt-500 bg-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/70'
                )}
              >
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-mmt-500 rounded-t-full" />
                )}
                <Icon className={cn('w-4 h-4 shrink-0', isActive ? 'text-mmt-500' : 'text-gray-500')} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="p-4 md:p-5">
          {error && (
            <div className="mb-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-semibold">
              {error}
            </div>
          )}
          {activeTab === 'hotels' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-3 items-stretch">
              <div className="md:col-span-4">
                <div className={fieldShell}>
                  <MapPin className="w-5 h-5 text-mmt-500 mr-2 shrink-0" />
                  <div className="flex-grow min-w-0">
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wide leading-none mb-0.5">
                      City, Property or Location
                    </label>
                    <input
                      type="text"
                      value={hotelLocation}
                      onChange={(e) => setHotelLocation(e.target.value)}
                      placeholder="Enter city or hotel name"
                      className="w-full bg-transparent text-[15px] font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-none leading-tight truncate"
                    />
                  </div>
                </div>
              </div>
              <div className="md:col-span-2">
                <div className={cn(fieldShell, 'cursor-pointer')}>
                  <Calendar className="w-5 h-5 text-mmt-500 mr-2 shrink-0" />
                  <div className="flex-grow min-w-0 overflow-hidden">
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wide leading-none mb-0.5">
                      Check-in
                    </label>
                    <DatePicker
                      selected={checkInDate}
                      onChange={(date) => setCheckInDate(date)}
                      dateFormat="dd MMM yyyy"
                      className="w-full bg-transparent text-[15px] font-semibold text-gray-900 focus:outline-none leading-tight cursor-pointer"
                      minDate={new Date()}
                    />
                  </div>
                </div>
              </div>
              <div className="md:col-span-2">
                <div className={cn(fieldShell, 'cursor-pointer')}>
                  <Calendar className="w-5 h-5 text-mmt-500 mr-2 shrink-0" />
                  <div className="flex-grow min-w-0 overflow-hidden">
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wide leading-none mb-0.5">
                      Check-out
                    </label>
                    <DatePicker
                      selected={checkOutDate}
                      onChange={(date) => setCheckOutDate(date)}
                      dateFormat="dd MMM yyyy"
                      className="w-full bg-transparent text-[15px] font-semibold text-gray-900 focus:outline-none leading-tight cursor-pointer"
                      minDate={checkInDate || new Date()}
                    />
                  </div>
                </div>
              </div>
              <div className="md:col-span-3">
                <GuestSelector guests={guests} onChange={setGuests} />
              </div>
              <div className="md:col-span-1">
                <Button
                  type="button"
                  onClick={handleSearch}
                  className="w-full h-[52px] rounded-lg bg-mmt-500 hover:bg-mmt-600 text-white font-bold text-base shadow-none border-0"
                >
                  SEARCH
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'flights' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
              <div className="md:col-span-3">
                <div className={fieldShell}>
                  <Plane className="w-5 h-5 text-mmt-500 mr-2 shrink-0" />
                  <div className="flex-grow min-w-0">
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wide leading-none mb-0.5">
                      From
                    </label>
                    <input
                      type="text"
                      value={flightFrom}
                      onChange={(e) => setFlightFrom(e.target.value)}
                      placeholder="City or airport"
                      className="w-full bg-transparent text-[15px] font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-none leading-tight truncate"
                    />
                  </div>
                </div>
              </div>
              <div className="md:col-span-1 flex md:items-end justify-center pb-2 md:pb-3">
                <button
                  type="button"
                  onClick={swapFlightCities}
                  className="p-2 rounded-full border border-[#d8d8d8] bg-white text-mmt-500 hover:bg-mmt-50 hover:border-mmt-500/40 transition-colors"
                  aria-label="Swap from and to"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </button>
              </div>
              <div className="md:col-span-3">
                <div className={fieldShell}>
                  <MapPin className="w-5 h-5 text-mmt-500 mr-2 shrink-0" />
                  <div className="flex-grow min-w-0">
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wide leading-none mb-0.5">
                      To
                    </label>
                    <input
                      type="text"
                      value={flightTo}
                      onChange={(e) => setFlightTo(e.target.value)}
                      placeholder="City or airport"
                      className="w-full bg-transparent text-[15px] font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-none leading-tight truncate"
                    />
                  </div>
                </div>
              </div>
              <div className="md:col-span-3">
                <div className={cn(fieldShell, 'cursor-pointer')}>
                  <Calendar className="w-5 h-5 text-mmt-500 mr-2 shrink-0" />
                  <div className="flex-grow min-w-0 overflow-hidden">
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wide leading-none mb-0.5">
                      Departure
                    </label>
                    <DatePicker
                      selected={flightDate}
                      onChange={(date) => setFlightDate(date)}
                      dateFormat="dd MMM yyyy"
                      className="w-full bg-transparent text-[15px] font-semibold text-gray-900 focus:outline-none leading-tight cursor-pointer"
                      minDate={new Date()}
                    />
                  </div>
                </div>
              </div>
              <div className="md:col-span-2">
                <Button
                  type="button"
                  onClick={handleSearch}
                  className="w-full h-[52px] rounded-lg bg-mmt-500 hover:bg-mmt-600 text-white font-bold text-base shadow-none border-0"
                >
                  SEARCH
                </Button>
              </div>
            </div>
          )}

          {(activeTab === 'cabs' || activeTab === 'buses') && (
            <div className="flex items-center justify-center min-h-[120px] text-gray-500 text-sm font-medium">
              {activeTab === 'cabs' ? 'Cab booking' : 'Bus booking'} — coming soon
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchWidget;
