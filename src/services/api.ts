import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to add the auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const authService = {
    login: async (credentials: any) => {
        const response = await api.post('/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },
    signup: async (userData: any) => {
        const response = await api.post('/auth/signup', userData);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }
};

export const searchService = {
    searchFlights: async (params: any) => {
        // canonical MVP endpoint
        const response = await api.get('/flights', { params });
        return response.data;
    },
    searchHotels: async (params: any) => {
        // canonical MVP endpoint
        const response = await api.get('/hotels', { params });
        return response.data;
    }
};

export const detailsService = {
    flightById: async (id: string) => {
        const response = await api.get(`/flights/${id}`);
        return response.data;
    },
    hotelById: async (id: string) => {
        const response = await api.get(`/hotels/${id}`);
        return response.data;
    }
};

export const bookingService = {
    create: async (payload: any) => {
        const response = await api.post('/bookings', payload);
        return response.data;
    },
    list: async (params: any) => {
        const response = await api.get('/bookings', { params });
        return response.data;
    },
    byId: async (id: string) => {
        const response = await api.get(`/bookings/${id}`);
        return response.data;
    }
};

export default api;
