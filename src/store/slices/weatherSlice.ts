import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

export interface WeatherData {
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  current: {
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    feelsLike: number;
    uvIndex: number;
    visibility: number;
    icon: string;
  };
  forecast: Array<{
    date: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
    precipitation: number;
    humidity: number;
  }>;
  lastUpdated: string;
}

interface WeatherState {
  currentWeather: WeatherData | null;
  savedLocations: WeatherData[];
  loading: boolean;
  error: string | null;
  units: 'metric' | 'imperial';
}

const initialState: WeatherState = {
  currentWeather: null,
  savedLocations: [],
  loading: false,
  error: null,
  units: 'metric',
};

// Mock weather data generator
const generateMockWeather = (location: string, lat: number, lng: number): WeatherData => {
  const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy', 'Thunderstorms'];
  const icons = ['sun', 'cloud-sun', 'cloud', 'cloud-rain', 'zap'];
  
  const randomCondition = Math.floor(Math.random() * conditions.length);
  const baseTemp = Math.floor(Math.random() * 30) + 10; // 10-40°C
  
  return {
    location,
    coordinates: { lat, lng },
    current: {
      temperature: baseTemp,
      condition: conditions[randomCondition],
      humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
      windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
      feelsLike: baseTemp + Math.floor(Math.random() * 6) - 3, // ±3°C
      uvIndex: Math.floor(Math.random() * 10) + 1, // 1-10
      visibility: Math.floor(Math.random() * 5) + 5, // 5-10 km
      icon: icons[randomCondition],
    },
    forecast: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      high: baseTemp + Math.floor(Math.random() * 10) - 5,
      low: baseTemp - Math.floor(Math.random() * 10) - 5,
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      icon: icons[Math.floor(Math.random() * icons.length)],
      precipitation: Math.floor(Math.random() * 100), // 0-100%
      humidity: Math.floor(Math.random() * 40) + 40,
    })),
    lastUpdated: new Date().toISOString(),
  };
};

// Async thunks
export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (params: { location: string; lat: number; lng: number }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real app, you would call a weather API like OpenWeatherMap
    return generateMockWeather(params.location, params.lat, params.lng);
  }
);

export const fetchWeatherByCoordinates = createAsyncThunk(
  'weather/fetchWeatherByCoordinates',
  async (coordinates: { lat: number; lng: number }) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Reverse geocoding would be done here to get location name
    const locationName = `${coordinates.lat.toFixed(2)}, ${coordinates.lng.toFixed(2)}`;
    return generateMockWeather(locationName, coordinates.lat, coordinates.lng);
  }
);

export const fetchMultipleLocationsWeather = createAsyncThunk(
  'weather/fetchMultipleLocations',
  async (locations: Array<{ name: string; lat: number; lng: number }>) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return locations.map(loc => generateMockWeather(loc.name, loc.lat, loc.lng));
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setUnits: (state, action: PayloadAction<'metric' | 'imperial'>) => {
      state.units = action.payload;
    },
    addSavedLocation: (state, action: PayloadAction<WeatherData>) => {
      const exists = state.savedLocations.find(
        loc => loc.location === action.payload.location
      );
      if (!exists) {
        state.savedLocations.push(action.payload);
      }
    },
    removeSavedLocation: (state, action: PayloadAction<string>) => {
      state.savedLocations = state.savedLocations.filter(
        loc => loc.location !== action.payload
      );
    },
    clearCurrentWeather: (state) => {
      state.currentWeather = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateWeatherData: (state, action: PayloadAction<{ location: string; data: Partial<WeatherData> }>) => {
      const { location, data } = action.payload;
      
      if (state.currentWeather?.location === location) {
        state.currentWeather = { ...state.currentWeather, ...data };
      }
      
      const savedIndex = state.savedLocations.findIndex(loc => loc.location === location);
      if (savedIndex !== -1) {
        state.savedLocations[savedIndex] = { ...state.savedLocations[savedIndex], ...data };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWeather = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch weather data';
      })
      .addCase(fetchWeatherByCoordinates.fulfilled, (state, action) => {
        state.currentWeather = action.payload;
      })
      .addCase(fetchMultipleLocationsWeather.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMultipleLocationsWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.savedLocations = action.payload;
      })
      .addCase(fetchMultipleLocationsWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch weather data';
      });
  },
});

export const {
  setUnits,
  addSavedLocation,
  removeSavedLocation,
  clearCurrentWeather,
  clearError,
  updateWeatherData,
} = weatherSlice.actions;

export default weatherSlice.reducer;
