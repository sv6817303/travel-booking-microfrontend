import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './store';
import './App.css';

// Import components
import SimpleHeader from './components/SimpleHeader';
import SimpleHomePage from './pages/SimpleHomePage';
import SearchPage from './pages/SearchPage';
import DestinationPage from './pages/DestinationPage';
import ItineraryPage from './pages/ItineraryPage';
import WeatherPage from './pages/WeatherPage';
import GalleryPage from './pages/GalleryPage';
import ProfilePage from './pages/ProfilePage';

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
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <SimpleHeader />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<SimpleHomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/destinations" element={<DestinationPage />} />
                <Route path="/destinations/:id" element={<DestinationPage />} />
                <Route path="/itinerary" element={<ItineraryPage />} />
                <Route path="/itinerary/:id" element={<ItineraryPage />} />
                <Route path="/weather" element={<WeatherPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
