export type Flight = {
  id: string;
  airline: string;
  from: string;
  to: string;
  departureTime: string; // "HH:mm"
  arrivalTime: string; // "HH:mm"
  duration: string; // "2h 05m"
  price: number; // INR
};

export type FlightsSearchParams = {
  from: string;
  to: string;
  date: string; // YYYY-MM-DD (kept for routing; mock backend may ignore)
};

