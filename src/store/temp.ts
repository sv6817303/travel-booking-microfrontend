import { configureStore, createSlice } from '@reduxjs/toolkit';

// Temporary simplified slices to get the app running
const searchSlice = createSlice({
  name: 'search',
  initialState: { results: [], loading: false },
  reducers: {},
});

const destinationSlice = createSlice({
  name: 'destinations',
  initialState: { featured: [], loading: false },
  reducers: {},
});

const itinerarySlice = createSlice({
  name: 'itinerary',
  initialState: { itineraries: [], loading: false },
  reducers: {},
});

const weatherSlice = createSlice({
  name: 'weather',
  initialState: { currentWeather: null, loading: false },
  reducers: {},
});

const userSlice = createSlice({
  name: 'user',
  initialState: { currentUser: null, isAuthenticated: false },
  reducers: {},
});

export const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    destinations: destinationSlice.reducer,
    itinerary: itinerarySlice.reducer,
    weather: weatherSlice.reducer,
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
