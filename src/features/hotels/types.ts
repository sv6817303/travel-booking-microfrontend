export type HotelAmenity = 'wifi' | 'pool' | 'parking' | 'restaurant' | 'bar' | 'gym' | 'breakfast';

export type Hotel = {
  id: string;
  name: string;
  city: string;
  price: number; // INR per night (displayed as USD in UI)
  rating: number; // 0-5
  amenities: HotelAmenity[];
  image: string;
};

export type HotelsQuery = {
  destination: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
};

export type HotelFilters = {
  priceRange: Array<'0-3000' | '3000-5000' | '5000-8000' | '8000+' >;
  ratings: Array<3 | 4 | 5>;
  amenities: HotelAmenity[];
};

export type HotelSort = 'popularity' | 'price_asc' | 'price_desc' | 'rating_desc';

