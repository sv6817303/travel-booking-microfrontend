import { Button } from '../../../components/ui/Button';
import type { Flight } from '../types';
import { ArrowRight, Clock3, Plane } from 'lucide-react';
import { formatUSDFromINR } from '../../../shared/utils/currency';

export type FlightCardProps = {
  flight: Flight;
  onSelect?: (flight: Flight) => void;
};

export function FlightCard({ flight, onSelect }: FlightCardProps) {
  return (
    <div className="bg-white rounded-lg border border-[#e8e8e8] shadow-sm hover:shadow-md transition-shadow p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-4">
      <div className="flex items-center gap-3 min-w-[220px]">
        <div className="w-10 h-10 rounded-lg bg-mmt-50 flex items-center justify-center text-mmt-500">
          <Plane className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <div className="font-bold text-gray-900 truncate">{flight.airline}</div>
          <div className="text-xs text-gray-500">{flight.id}</div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-3 items-center gap-3">
        <div>
          <div className="text-sm font-bold text-gray-900">{flight.departureTime}</div>
          <div className="text-xs text-gray-500">
            {flight.from}
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
            <Clock3 className="w-3.5 h-3.5" />
            {flight.duration}
          </div>
          <div className="text-xs text-gray-400 mt-1 flex items-center justify-center gap-1">
            <span className="h-px w-10 bg-gray-300" />
            <ArrowRight className="w-3.5 h-3.5" />
            <span className="h-px w-10 bg-gray-300" />
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-gray-900">{flight.arrivalTime}</div>
          <div className="text-xs text-gray-500">
            {flight.to}
          </div>
        </div>
      </div>

      <div className="md:w-56 flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3">
        <div className="text-xl font-extrabold text-gray-900">
          {formatUSDFromINR(flight.price)}
        </div>
        <Button
          variant="outline"
          className="font-bold"
          onClick={() => onSelect?.(flight)}
        >
          Select
        </Button>
      </div>
    </div>
  );
}

