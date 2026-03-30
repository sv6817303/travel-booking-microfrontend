import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

export interface SearchFilters {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  budget: {
    min: number;
    max: number;
  };
  tripType: 'holiday' | 'business' | 'adventure' | 'family';
}

export interface SearchState {
  filters: SearchFilters;
  suggestions: string[];
  isLoading: boolean;
  error: string | null;
  recentSearches: SearchFilters[];
}

const initialState: SearchState = {
  filters: {
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    rooms: 1,
    budget: { min: 5000, max: 50000 },
    tripType: 'holiday',
  },
  suggestions: [],
  isLoading: false,
  error: null,
  recentSearches: [],
};

// Async thunk for fetching destination suggestions
export const fetchSuggestions = createAsyncThunk(
  'search/fetchSuggestions',
  async (query: string) => {
    // Mock API call - replace with actual API
    await new Promise(resolve => setTimeout(resolve, 300));
    const mockSuggestions = [
      'Goa, India',
      'Kerala, India',
      'Rajasthan, India',
      'Himachal Pradesh, India',
      'Kashmir, India',
      'Tamil Nadu, India',
      'Karnataka, India',
      'Mumbai, India',
      'Delhi, India',
      'Bangalore, India',
    ].filter(place => place.toLowerCase().includes(query.toLowerCase()));
    
    return mockSuggestions;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateFilters: (state, action: PayloadAction<Partial<SearchFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    addRecentSearch: (state, action: PayloadAction<SearchFilters>) => {
      const existingIndex = state.recentSearches.findIndex(
        search => search.destination === action.payload.destination
      );
      
      if (existingIndex >= 0) {
        state.recentSearches.splice(existingIndex, 1);
      }
      
      state.recentSearches.unshift(action.payload);
      state.recentSearches = state.recentSearches.slice(0, 5); // Keep only last 5
    },
    clearSuggestions: (state) => {
      state.suggestions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.suggestions = action.payload;
      })
      .addCase(fetchSuggestions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch suggestions';
      });
  },
});

export const { updateFilters, clearFilters, addRecentSearch, clearSuggestions } = searchSlice.actions;
export default searchSlice.reducer;
