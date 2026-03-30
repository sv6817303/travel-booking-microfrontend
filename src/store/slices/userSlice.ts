import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface UserPreferences {
  currency: string;
  language: string;
  units: 'metric' | 'imperial';
  notifications: {
    bookingUpdates: boolean;
    weatherAlerts: boolean;
    promotions: boolean;
    newsletter: boolean;
  };
  accessibility: {
    highContrast: boolean;
    largeText: boolean;
    reducedMotion: boolean;
  };
  privacy: {
    shareData: boolean;
    cookies: boolean;
    analytics: boolean;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: UserPreferences;
  favoriteDestinations: string[];
  savedItineraries: string[];
  bookingHistory: string[];
  loyaltyPoints: number;
  membershipLevel: 'bronze' | 'silver' | 'gold' | 'platinum';
  joinDate: string;
  lastLogin: string;
}

interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  loginAttempts: number;
  lastLoginAttempt: string | null;
}

const defaultPreferences: UserPreferences = {
  currency: 'USD',
  language: 'en',
  units: 'metric',
  notifications: {
    bookingUpdates: true,
    weatherAlerts: true,
    promotions: false,
    newsletter: false,
  },
  accessibility: {
    highContrast: false,
    largeText: false,
    reducedMotion: false,
  },
  privacy: {
    shareData: false,
    cookies: true,
    analytics: true,
  },
};

const initialState: UserState = {
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  loginAttempts: 0,
  lastLoginAttempt: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.loginAttempts = 0;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.loginAttempts += 1;
      state.lastLoginAttempt = new Date().toISOString();
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.error = null;
      state.loginAttempts = 0;
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
    updatePreferences: (state, action: PayloadAction<Partial<UserPreferences>>) => {
      if (state.currentUser) {
        state.currentUser.preferences = {
          ...state.currentUser.preferences,
          ...action.payload,
        };
      }
    },
    addFavoriteDestination: (state, action: PayloadAction<string>) => {
      if (state.currentUser) {
        const destinations = state.currentUser.favoriteDestinations;
        if (!destinations.includes(action.payload)) {
          destinations.push(action.payload);
        }
      }
    },
    removeFavoriteDestination: (state, action: PayloadAction<string>) => {
      if (state.currentUser) {
        state.currentUser.favoriteDestinations = state.currentUser.favoriteDestinations.filter(
          id => id !== action.payload
        );
      }
    },
    addSavedItinerary: (state, action: PayloadAction<string>) => {
      if (state.currentUser) {
        const itineraries = state.currentUser.savedItineraries;
        if (!itineraries.includes(action.payload)) {
          itineraries.push(action.payload);
        }
      }
    },
    removeSavedItinerary: (state, action: PayloadAction<string>) => {
      if (state.currentUser) {
        state.currentUser.savedItineraries = state.currentUser.savedItineraries.filter(
          id => id !== action.payload
        );
      }
    },
    updateLoyaltyPoints: (state, action: PayloadAction<number>) => {
      if (state.currentUser) {
        state.currentUser.loyaltyPoints += action.payload;
        
        // Update membership level based on points
        const points = state.currentUser.loyaltyPoints;
        if (points >= 10000) {
          state.currentUser.membershipLevel = 'platinum';
        } else if (points >= 5000) {
          state.currentUser.membershipLevel = 'gold';
        } else if (points >= 1000) {
          state.currentUser.membershipLevel = 'silver';
        } else {
          state.currentUser.membershipLevel = 'bronze';
        }
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    resetLoginAttempts: (state) => {
      state.loginAttempts = 0;
      state.lastLoginAttempt = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateProfile,
  updatePreferences,
  addFavoriteDestination,
  removeFavoriteDestination,
  addSavedItinerary,
  removeSavedItinerary,
  updateLoyaltyPoints,
  clearError,
  resetLoginAttempts,
} = userSlice.actions;

export default userSlice.reducer;

// Utility function to create a demo user
export const createDemoUser = (): User => ({
  id: 'demo-user-123',
  name: 'Travel Explorer',
  email: 'demo@travelapp.com',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150',
  preferences: defaultPreferences,
  favoriteDestinations: ['1', '2'], // Bali and Paris from mock data
  savedItineraries: ['template-1'],
  bookingHistory: [],
  loyaltyPoints: 2500,
  membershipLevel: 'silver',
  joinDate: '2024-01-01T00:00:00Z',
  lastLogin: new Date().toISOString(),
});
