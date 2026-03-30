import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

export interface ItineraryItem {
  id: string;
  day: number;
  time: string;
  activity: string;
  location: string;
  duration: number; // in hours
  cost: number;
  description: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  category: 'sightseeing' | 'dining' | 'activity' | 'transport' | 'accommodation';
  bookingUrl?: string;
  notes?: string;
}

export interface Itinerary {
  id: string;
  destination: string;
  title: string;
  duration: number; // in days
  totalCost: number;
  items: ItineraryItem[];
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  tags: string[];
}

interface ItineraryState {
  itineraries: Itinerary[];
  currentItinerary: Itinerary | null;
  loading: boolean;
  error: string | null;
  templates: Itinerary[];
  sharedItineraries: Itinerary[];
}

const initialState: ItineraryState = {
  itineraries: [],
  currentItinerary: null,
  loading: false,
  error: null,
  templates: [],
  sharedItineraries: [],
};

// Mock template data
const mockTemplates: Itinerary[] = [
  {
    id: 'template-1',
    destination: 'Paris, France',
    title: '7-Day Paris Explorer',
    duration: 7,
    totalCost: 1200,
    items: [
      {
        id: 'item-1',
        day: 1,
        time: '09:00',
        activity: 'Visit Eiffel Tower',
        location: 'Eiffel Tower',
        duration: 3,
        cost: 29,
        description: 'Iconic tower with city views',
        coordinates: { lat: 48.8584, lng: 2.2945 },
        category: 'sightseeing',
      },
      {
        id: 'item-2',
        day: 1,
        time: '14:00',
        activity: 'Lunch at Café de Flore',
        location: 'Saint-Germain-des-Prés',
        duration: 2,
        cost: 45,
        description: 'Historic café with French cuisine',
        coordinates: { lat: 48.8542, lng: 2.3320 },
        category: 'dining',
      },
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    isPublic: true,
    tags: ['city', 'culture', 'romantic'],
  },
];

// Async thunks
export const fetchItineraries = createAsyncThunk(
  'itinerary/fetchItineraries',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockTemplates;
  }
);

export const generateItinerary = createAsyncThunk(
  'itinerary/generateItinerary',
  async (params: { destination: string; duration: number; budget: number; preferences: string[] }) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock AI-generated itinerary
    const newItinerary: Itinerary = {
      id: `generated-${Date.now()}`,
      destination: params.destination,
      title: `${params.duration}-Day ${params.destination} Adventure`,
      duration: params.duration,
      totalCost: params.budget,
      items: [
        {
          id: `item-${Date.now()}`,
          day: 1,
          time: '09:00',
          activity: `Explore ${params.destination}`,
          location: params.destination,
          duration: 4,
          cost: Math.floor(params.budget * 0.1),
          description: 'Start your adventure',
          category: 'sightseeing',
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPublic: false,
      tags: params.preferences,
    };

    return newItinerary;
  }
);

const itinerarySlice = createSlice({
  name: 'itinerary',
  initialState,
  reducers: {
    setCurrentItinerary: (state, action: PayloadAction<Itinerary | null>) => {
      state.currentItinerary = action.payload;
    },
    addItineraryItem: (state, action: PayloadAction<{ itineraryId: string; item: ItineraryItem }>) => {
      const { itineraryId, item } = action.payload;
      const itinerary = state.itineraries.find(i => i.id === itineraryId);
      if (itinerary) {
        itinerary.items.push(item);
        itinerary.totalCost += item.cost;
        itinerary.updatedAt = new Date().toISOString();
      }
      if (state.currentItinerary?.id === itineraryId) {
        state.currentItinerary.items.push(item);
        state.currentItinerary.totalCost += item.cost;
      }
    },
    updateItineraryItem: (state, action: PayloadAction<{ itineraryId: string; itemId: string; updates: Partial<ItineraryItem> }>) => {
      const { itineraryId, itemId, updates } = action.payload;
      const itinerary = state.itineraries.find(i => i.id === itineraryId);
      if (itinerary) {
        const itemIndex = itinerary.items.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
          const oldCost = itinerary.items[itemIndex].cost;
          itinerary.items[itemIndex] = { ...itinerary.items[itemIndex], ...updates };
          itinerary.totalCost = itinerary.totalCost - oldCost + (updates.cost || oldCost);
          itinerary.updatedAt = new Date().toISOString();
        }
      }
    },
    removeItineraryItem: (state, action: PayloadAction<{ itineraryId: string; itemId: string }>) => {
      const { itineraryId, itemId } = action.payload;
      const itinerary = state.itineraries.find(i => i.id === itineraryId);
      if (itinerary) {
        const itemIndex = itinerary.items.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
          const removedItem = itinerary.items[itemIndex];
          itinerary.items.splice(itemIndex, 1);
          itinerary.totalCost -= removedItem.cost;
          itinerary.updatedAt = new Date().toISOString();
        }
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItineraries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItineraries.fulfilled, (state, action) => {
        state.loading = false;
        state.templates = action.payload;
      })
      .addCase(fetchItineraries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch itineraries';
      })
      .addCase(generateItinerary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateItinerary.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItinerary = action.payload;
        state.itineraries.push(action.payload);
      })
      .addCase(generateItinerary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to generate itinerary';
      });
  },
});

export const {
  setCurrentItinerary,
  addItineraryItem,
  updateItineraryItem,
  removeItineraryItem,
  clearError,
} = itinerarySlice.actions;

export default itinerarySlice.reducer;
