const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/search', require('./routes/searchRoutes')); // legacy

// MVP routes (clean)
app.use('/api/flights', require('./routes/flights.route'));
app.use('/api/hotels', require('./routes/hotelsRoutes'));
app.use('/api/bookings', require('./routes/bookingsRoutes'));

// Basic route
app.get('/', (req, res) => {
    res.send('Travel Booking API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
