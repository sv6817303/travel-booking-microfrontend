import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  images: string[];
  attractions: string[];
  bestTimeToVisit: string;
  averageTemperature: string;
  currency: string;
  language: string;
  timeZone: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  rating: number;
  reviewCount: number;
  popularActivities: string[];
  estimatedBudget: {
    budget: number;
    midRange: number;
    luxury: number;
  };
}

interface DestinationState {
  destinations: Destination[];
  featured: Destination[];
  selectedDestination: Destination | null;
  loading: boolean;
  error: string | null;
  categories: {
    beach: Destination[];
    mountain: Destination[];
    city: Destination[];
    adventure: Destination[];
    cultural: Destination[];
  };
}

const initialState: DestinationState = {
  destinations: [],
  featured: [],
  selectedDestination: null,
  loading: false,
  error: null,
  categories: {
    beach: [],
    mountain: [],
    city: [],
    adventure: [],
    cultural: [],
  },
};

// Mock data for demonstration
const mockDestinations: Destination[] = [
  {
    id: '1',
    name: 'Bali',
    country: 'Indonesia',
    description: 'Tropical paradise with stunning beaches, ancient temples, and vibrant culture.',
    images: [
      'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800',
    ],
    attractions: ['Uluwatu Temple', 'Rice Terraces', 'Mount Batur', 'Seminyak Beach'],
    bestTimeToVisit: 'April to October',
    averageTemperature: '26-30°C',
    currency: 'Indonesian Rupiah',
    language: 'Indonesian',
    timeZone: 'UTC+8',
    coordinates: { lat: -8.3405, lng: 115.0920 },
    rating: 4.7,
    reviewCount: 15420,
    popularActivities: ['Surfing', 'Temple Tours', 'Spa Treatments', 'Cultural Shows'],
    estimatedBudget: { budget: 50, midRange: 120, luxury: 300 },
  },
  {
    id: '2',
    name: 'Paris',
    country: 'France',
    description: 'City of Light with iconic landmarks, world-class cuisine, and rich history.',
    images: [
      'https://images.unsplash.com/photo-1549144511-f099e773c147?w=800',
      'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800',
    ],
    attractions: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame', 'Champs-Élysées'],
    bestTimeToVisit: 'June to August',
    averageTemperature: '15-25°C',
    currency: 'Euro',
    language: 'French',
    timeZone: 'UTC+1',
    coordinates: { lat: 48.8566, lng: 2.3522 },
    rating: 4.8,
    reviewCount: 23150,
    popularActivities: ['Museums', 'Shopping', 'Fine Dining', 'River Cruise'],
    estimatedBudget: { budget: 80, midRange: 180, luxury: 450 },
  },
];

// Async thunks
export const fetchDestinations = createAsyncThunk(
  'destinations/fetchDestinations',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockDestinations;
  }
);

export const fetchDestinationById = createAsyncThunk(
  'destinations/fetchDestinationById',
  async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockDestinations.find(dest => dest.id === id) || null;
  }
);

const destinationSlice = createSlice({
  name: 'destinations',
  initialState,
  reducers: {
    setSelectedDestination: (state, action: PayloadAction<Destination | null>) => {
      state.selectedDestination = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    categorizeDestinations: (state) => {
      state.destinations.forEach(dest => {
        // Simple categorization logic
        if (dest.popularActivities.includes('Surfing')) {
          state.categories.beach.push(dest);
        }
        if (dest.popularActivities.includes('Museums')) {
          state.categories.city.push(dest);
        }
        // Add more categorization logic as needed
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDestinations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDestinations.fulfilled, (state, action) => {
        state.loading = false;
        state.destinations = action.payload;
        state.featured = action.payload.slice(0, 6);
      })
      .addCase(fetchDestinations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch destinations';
      })
      .addCase(fetchDestinationById.fulfilled, (state, action) => {
        state.selectedDestination = action.payload;
      });
  },
});

export const { setSelectedDestination, clearError, categorizeDestinations } = destinationSlice.actions;
export default destinationSlice.reducer;
