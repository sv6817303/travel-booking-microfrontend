const bookings = [];

exports.createBooking = (req, res) => {
  const { type, itemId, traveller, meta } = req.body || {};

  if (!type || !itemId) {
    return res.status(400).json({ success: false, message: 'type and itemId are required' });
  }
  if (!traveller?.fullName || !traveller?.email || !traveller?.phone) {
    return res.status(400).json({ success: false, message: 'traveller details are required' });
  }

  const bookingId = `BK_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  const createdAt = new Date().toISOString();

  const record = {
    bookingId,
    type,
    itemId,
    traveller,
    meta: meta || {},
    status: 'CONFIRMED',
    createdAt,
  };

  bookings.unshift(record);
  res.status(201).json({ success: true, data: record });
};

exports.listBookings = (req, res) => {
  const { email } = req.query;
  const q = String(email || '').trim().toLowerCase();
  const filtered = q ? bookings.filter((b) => String(b.traveller?.email || '').toLowerCase() === q) : bookings;
  res.json({ success: true, data: filtered });
};

exports.getBookingById = (req, res) => {
  const { id } = req.params;
  const found = bookings.find((b) => b.bookingId === id);
  if (!found) return res.status(404).json({ success: false, message: 'Booking not found' });
  res.json({ success: true, data: found });
};

