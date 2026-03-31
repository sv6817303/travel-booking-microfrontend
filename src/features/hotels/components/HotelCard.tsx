import type { Hotel } from '../types';
import { Button } from '../../../components/ui/Button';
import { MapPin, Star, Wifi, Car, UtensilsCrossed, Dumbbell, Coffee, Waves, Wine } from 'lucide-react';
import { cn } from '../../../lib/utils';
import React from 'react';
import { formatUSDFromINR } from '../../../shared/utils/currency';

export type HotelCardProps = {
  hotel: Hotel;
  onViewDetails?: (hotelId: string) => void;
};

const amenityIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  wifi: Wifi,
  parking: Car,
  restaurant: UtensilsCrossed,
  gym: Dumbbell,
  breakfast: Coffee,
  pool: Waves,
  bar: Wine,
};

export function HotelCard({ hotel, onViewDetails }: HotelCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-[#e8e8e8] overflow-hidden flex flex-col md:flex-row">
      <div className="md:w-1/3 relative h-48 md:h-auto">
        <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 p-5 flex flex-col md:flex-row justify-between gap-4">
        <div className="flex-1 pr-0 md:pr-4 md:border-r border-gray-100 md:border-dashed">
          <div className="flex justify-between items-start mb-2 gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'w-3 h-3',
                        i < Math.floor(hotel.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      )}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-400">Hotel</span>
              </div>
              <h3 className="text-lg md:text-xl font-extrabold text-gray-900 truncate">{hotel.name}</h3>
              <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3" /> {hotel.city}
              </p>
            </div>
            <div className="flex flex-col items-end shrink-0">
              <div className="bg-mmt-500 text-white px-2 py-1 rounded text-sm font-bold">
                {hotel.rating.toFixed(1)}
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            {hotel.amenities.slice(0, 5).map((a) => {
              const Icon = amenityIcon[a] || Wifi;
              return (
                <div key={a} className="flex items-center gap-1 text-xs text-gray-600">
                  <Icon className="w-3.5 h-3.5 text-green-600" />
                  {a}
                </div>
              );
            })}
          </div>
        </div>

        <div className="md:w-52 flex flex-col justify-between items-end text-right">
          <div>
            <div className="text-2xl font-extrabold text-gray-900">{formatUSDFromINR(hotel.price)}</div>
            <p className="text-xs text-gray-500">per night</p>
          </div>
          <div className="w-full mt-4 space-y-2">
            <Button className="w-full font-bold" onClick={() => onViewDetails?.(hotel.id)}>
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

