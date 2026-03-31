import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../layout/Layout';
import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';
import SignUpPage from '../../pages/SignUpPage';
import ProfilePage from '../../pages/ProfilePage';
import HotelResultsPage from '../../pages/HotelResultsPage';
import HotelDetailsPage from '../../pages/HotelDetailsPage';
import BookingPage from '../../pages/BookingPage';
import PaymentPage from '../../pages/PaymentPage';
import ConfirmationPage from '../../pages/ConfirmationPage';
import FlightsHomePage from '../../features/flights/pages/FlightsHomePage';
import FlightsSearchPage from '../../features/flights/pages/FlightsSearchPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Core MVP modules (local) */}
        <Route path="/" element={<HomePage />} />
        <Route path="/search/hotels" element={<HotelResultsPage />} />
        <Route path="/hotel/:id" element={<HotelDetailsPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Flights MVP: Search → Results */}
        <Route path="/flights" element={<FlightsHomePage />} />
        <Route path="/search/flights" element={<FlightsSearchPage />} />

        {/* Legacy route */}
        <Route path="/search" element={<Navigate to="/search/hotels" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

