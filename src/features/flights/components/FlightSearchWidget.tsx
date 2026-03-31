import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ArrowRightLeft, Calendar, MapPin, Plane } from 'lucide-react';
import { cn } from '../../../lib/utils';

export type FlightSearchWidgetProps = {
  className?: string;
  defaultFrom?: string;
  defaultTo?: string;
  defaultDate?: Date;
};

function toYmd(d: Date | null) {
  if (!d) return '';
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function FlightSearchWidget({
  className,
  defaultFrom = '',
  defaultTo = '',
  defaultDate = new Date(),
}: FlightSearchWidgetProps) {
  const navigate = useNavigate();

  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);
  const [date, setDate] = useState<Date | null>(defaultDate);
  const [tripType, setTripType] = useState<'oneway' | 'roundtrip'>('oneway');
  const [travellers, setTravellers] = useState(1);
  const [cabinClass, setCabinClass] = useState<'Economy' | 'Premium Economy' | 'Business'>('Economy');

  const canSearch = useMemo(() => from.trim() && to.trim() && date, [from, to, date]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const onSearch = () => {
    if (!canSearch) return;
    const params = new URLSearchParams({
      from: from.trim(),
      to: to.trim(),
      date: toYmd(date),
    });
    navigate(`/search/flights?${params.toString()}`);
  };

  const shell =
    'border border-[#d8d8d8] rounded-lg px-3 py-2.5 h-[56px] flex items-center bg-white hover:border-mmt-500/40 transition-colors focus-within:border-mmt-500 focus-within:ring-1 focus-within:ring-mmt-500';

  return (
    <div className={cn('bg-white rounded-2xl shadow-[0_6px_28px_rgba(0,0,0,0.12)] border border-[#e8e8e8] overflow-hidden', className)}>
      <div className="px-5 py-4 border-b border-[#efefef] bg-[#fafafa] flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-gray-900 font-extrabold">
            <Plane className="w-5 h-5 text-mmt-500" />
            Flights
          </div>
          <div className="text-xs text-gray-500 font-semibold">MVP: Search → Results</div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tripType"
                checked={tripType === 'oneway'}
                onChange={() => setTripType('oneway')}
                className="text-mmt-500 focus:ring-mmt-500"
              />
              One Way
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tripType"
                checked={tripType === 'roundtrip'}
                onChange={() => setTripType('roundtrip')}
                className="text-mmt-500 focus:ring-mmt-500"
              />
              Round Trip
            </label>
          </div>

          <div className="ml-auto flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="px-3 py-1.5 rounded-full border border-[#e8e8e8] bg-white text-xs font-bold text-gray-700 hover:bg-gray-50"
              onClick={() => setTravellers((t) => Math.max(1, t - 1))}
              aria-label="Decrease travellers"
            >
              -
            </button>
            <div className="px-3 py-1.5 rounded-full border border-[#e8e8e8] bg-white text-xs font-bold text-gray-900">
              {travellers} Traveller{travellers !== 1 ? 's' : ''}
            </div>
            <button
              type="button"
              className="px-3 py-1.5 rounded-full border border-[#e8e8e8] bg-white text-xs font-bold text-gray-700 hover:bg-gray-50"
              onClick={() => setTravellers((t) => Math.min(9, t + 1))}
              aria-label="Increase travellers"
            >
              +
            </button>

            <select
              value={cabinClass}
              onChange={(e) => setCabinClass(e.target.value as any)}
              className="px-3 py-1.5 rounded-full border border-[#e8e8e8] bg-white text-xs font-bold text-gray-900 focus:ring-1 focus:ring-mmt-500"
              aria-label="Cabin class"
            >
              <option>Economy</option>
              <option>Premium Economy</option>
              <option>Business</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
          <div className="md:col-span-4">
            <div className={shell}>
              <MapPin className="w-5 h-5 text-mmt-500 mr-2 shrink-0" />
              <div className="flex-1 min-w-0">
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wide leading-none mb-1">
                  From
                </label>
                <Input
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="Delhi"
                  className="h-auto border-0 p-0 focus-visible:ring-0 text-[15px] font-semibold placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-1 flex md:items-end justify-center pb-1 md:pb-2">
            <button
              type="button"
              onClick={swap}
              className="p-2 rounded-full border border-[#d8d8d8] bg-white text-mmt-500 hover:bg-mmt-50 hover:border-mmt-500/40 transition-colors"
              aria-label="Swap from and to"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="md:col-span-4">
            <div className={shell}>
              <MapPin className="w-5 h-5 text-mmt-500 mr-2 shrink-0" />
              <div className="flex-1 min-w-0">
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wide leading-none mb-1">
                  To
                </label>
                <Input
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="Mumbai"
                  className="h-auto border-0 p-0 focus-visible:ring-0 text-[15px] font-semibold placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className={cn(shell, 'cursor-pointer')}>
              <Calendar className="w-5 h-5 text-mmt-500 mr-2 shrink-0" />
              <div className="flex-1 min-w-0 overflow-hidden">
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wide leading-none mb-1">
                  Departure
                </label>
                <DatePicker
                  selected={date}
                  onChange={(d) => setDate(d)}
                  dateFormat="dd MMM yyyy"
                  className="w-full bg-transparent text-[15px] font-semibold text-gray-900 focus:outline-none leading-tight cursor-pointer"
                  minDate={new Date()}
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-12">
            <Button
              type="button"
              className="w-full h-[52px] rounded-xl bg-mmt-500 hover:bg-mmt-600 text-white font-extrabold text-base border-0 shadow-none"
              onClick={onSearch}
              disabled={!canSearch}
            >
              Search Flights
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

