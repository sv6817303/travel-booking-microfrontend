import type { HotelAmenity, HotelFilters } from '../types';

export type FiltersSidebarProps = {
  value: HotelFilters;
  onChange: (next: HotelFilters) => void;
  onClear: () => void;
};

const priceOptions: Array<{ id: HotelFilters['priceRange'][number]; label: string }> = [
  { id: '0-3000', label: '$0 - $36' },
  { id: '3000-5000', label: '$36 - $60' },
  { id: '5000-8000', label: '$60 - $96' },
  { id: '8000+', label: '$96+' },
];

const ratingOptions: Array<{ id: 3 | 4 | 5; label: string }> = [
  { id: 5, label: '5 Star' },
  { id: 4, label: '4 Star' },
  { id: 3, label: '3 Star' },
];

const amenityOptions: Array<{ id: HotelAmenity; label: string }> = [
  { id: 'wifi', label: 'WiFi' },
  { id: 'pool', label: 'Pool' },
  { id: 'parking', label: 'Parking' },
  { id: 'restaurant', label: 'Restaurant' },
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'gym', label: 'Gym' },
];

function toggle<T extends string | number>(arr: T[], value: T): T[] {
  return arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value];
}

export function FiltersSidebar({ value, onChange, onClear }: FiltersSidebarProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 sticky top-[72px] border border-[#e8e8e8]">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-extrabold text-gray-900">Filters</h2>
        <button
          type="button"
          className="text-xs text-mmt-500 font-bold uppercase tracking-wide hover:underline"
          onClick={onClear}
        >
          Clear all
        </button>
      </div>

      <div className="space-y-7 text-sm text-gray-600">
        <div>
          <p className="font-extrabold text-gray-900 mb-3">Price per night</p>
          <div className="space-y-2">
            {priceOptions.map((o) => (
              <label key={o.id} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={value.priceRange.includes(o.id)}
                  onChange={() => onChange({ ...value, priceRange: toggle(value.priceRange, o.id) })}
                  className="w-4 h-4 rounded border-gray-300 text-mmt-500 focus:ring-mmt-500"
                />
                <span className="group-hover:text-gray-900">{o.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="font-extrabold text-gray-900 mb-3">Star rating</p>
          <div className="space-y-2">
            {ratingOptions.map((o) => (
              <label key={o.id} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={value.ratings.includes(o.id)}
                  onChange={() => onChange({ ...value, ratings: toggle(value.ratings, o.id) })}
                  className="w-4 h-4 rounded border-gray-300 text-mmt-500 focus:ring-mmt-500"
                />
                <span className="group-hover:text-gray-900">{o.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="font-extrabold text-gray-900 mb-3">Amenities</p>
          <div className="space-y-2">
            {amenityOptions.map((o) => (
              <label key={o.id} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={value.amenities.includes(o.id)}
                  onChange={() => onChange({ ...value, amenities: toggle(value.amenities, o.id) })}
                  className="w-4 h-4 rounded border-gray-300 text-mmt-500 focus:ring-mmt-500"
                />
                <span className="group-hover:text-gray-900">{o.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

