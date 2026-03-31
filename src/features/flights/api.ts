import { searchService } from '../../services/api';
import type { Flight, FlightsSearchParams } from './types';

export async function searchFlights(params: FlightsSearchParams): Promise<Flight[]> {
  const resp = await searchService.searchFlights(params);
  if (!resp?.success) return [];
  return normalizeFlights(resp.data || []);
}

function normalizeFlights(raw: any[]): Flight[] {
  return raw.map((f: any) => {
    // Supports both MVP contract and legacy backend shape (departure/arrival objects).
    if (f?.departure && f?.arrival) {
      return {
        id: String(f.id ?? ''),
        airline: String(f.airline ?? ''),
        from: String(f.departure.city ?? ''),
        to: String(f.arrival.city ?? ''),
        departureTime: String(f.departure.time ?? ''),
        arrivalTime: String(f.arrival.time ?? ''),
        duration: String(f.duration ?? ''),
        price: Math.round(Number(f.price ?? 0) * 100),
      };
    }

    return {
      id: String(f.id ?? ''),
      airline: String(f.airline ?? ''),
      from: String(f.from ?? ''),
      to: String(f.to ?? ''),
      departureTime: String(f.departureTime ?? ''),
      arrivalTime: String(f.arrivalTime ?? ''),
      duration: String(f.duration ?? ''),
      price: Number(f.price ?? 0),
    };
  });
}

