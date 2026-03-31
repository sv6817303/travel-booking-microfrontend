import { FlightSearchWidget } from '../components/FlightSearchWidget';

export default function FlightsHomePage() {
  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Flights</h1>
          <p className="text-sm text-gray-600 mt-1">
            Search flights by From, To and Departure Date.
          </p>
        </div>
        <FlightSearchWidget />
      </div>
    </div>
  );
}

