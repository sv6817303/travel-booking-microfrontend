import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './store';
import SimpleHeader from './components/SimpleHeader';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import DestinationPage from './pages/DestinationPage';
import CabsPage from './pages/CabsPage';
import BusTicketPage from './pages/BusTicketPage';
import TravelPage from './pages/TravelPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import BusinessTravelPage from './pages/BusinessTravelPage';
import InsurancePage from './pages/InsurancePage';
import ItineraryPage from './pages/ItineraryPage';
import WeatherPage from './pages/WeatherPage';
import GalleryPage from './pages/GalleryPage';
import FlightResultsPage from './pages/FlightResultsPage';
import HotelResultsPage from './pages/HotelResultsPage';
import FlightDetailsPage from './pages/FlightDetailsPage';
import HotelDetailsPage from './pages/HotelDetailsPage';
import BookingPage from './pages/BookingPage';
import PaymentPage from './pages/PaymentPage';
import ConfirmationPage from './pages/ConfirmationPage';
import './App.css';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="min-h-screen bg-[#f2f2f2] flex flex-col">
            <SimpleHeader />
            <main className="flex-1 pt-[56px] md:pt-[60px]">
              <Routes>
                <Route path="/" element={<HomePage />} />
                {/* MVP routes */}
                <Route path="/search/flights" element={<FlightResultsPage />} />
                <Route path="/search/hotels" element={<HotelResultsPage />} />
                <Route path="/flight/:id" element={<FlightDetailsPage />} />
                <Route path="/hotel/:id" element={<HotelDetailsPage />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/confirmation" element={<ConfirmationPage />} />

                {/* Legacy / compatibility */}
                <Route path="/search" element={<Navigate to="/search/hotels" replace />} />
                <Route path="/search-old" element={<SearchPage />} />
                <Route path="/destinations" element={<DestinationPage />} />
                <Route path="/destinations/:id" element={<DestinationPage />} />
                <Route path="/cabs" element={<CabsPage />} />
                <Route path="/bus-ticket" element={<BusTicketPage />} />
                <Route path="/travel" element={<TravelPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/business-travel" element={<BusinessTravelPage />} />
                <Route path="/insurance" element={<InsurancePage />} />
                <Route path="/itinerary" element={<ItineraryPage />} />
                <Route path="/itinerary/:id" element={<ItineraryPage />} />
                <Route path="/weather" element={<WeatherPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
