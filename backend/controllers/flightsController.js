const flights = [
  {
    id: 'f1',
    airline: 'SkyHigh Airways',
    flightNumber: 'SH101',
    departure: { city: 'New Delhi', time: '10:00 AM', code: 'DEL' },
    arrival: { city: 'Mumbai', time: '12:10 PM', code: 'BOM' },
    price: 450,
    duration: '2h 10m',
  },
  {
    id: 'f2',
    airline: 'Oceanic Airlines',
    flightNumber: 'OA815',
    departure: { city: 'New Delhi', time: '02:00 PM', code: 'DEL' },
    arrival: { city: 'Bengaluru', time: '04:45 PM', code: 'BLR' },
    price: 520,
    duration: '2h 45m',
  },
  {
    id: 'f3',
    airline: 'Global Wings',
    flightNumber: 'GW505',
    departure: { city: 'Mumbai', time: '06:00 PM', code: 'BOM' },
    arrival: { city: 'Goa', time: '07:20 PM', code: 'GOI' },
    price: 380,
    duration: '1h 20m',
  },
];

function normalize(s) {
  return String(s || '').trim().toLowerCase();
}

exports.listFlights = (req, res) => {
  const { from, to } = req.query;
  const fromQ = normalize(from);
  const toQ = normalize(to);

  const filtered = flights.filter((f) => {
    const dep = normalize(f.departure.city) + ' ' + normalize(f.departure.code);
    const arr = normalize(f.arrival.city) + ' ' + normalize(f.arrival.code);
    const fromOk = fromQ ? dep.includes(fromQ) : true;
    const toOk = toQ ? arr.includes(toQ) : true;
    return fromOk && toOk;
  });

  res.json({ success: true, data: filtered });
};

exports.getFlightById = (req, res) => {
  const { id } = req.params;
  const found = flights.find((f) => f.id === id);
  if (!found) return res.status(404).json({ success: false, message: 'Flight not found' });
  res.json({ success: true, data: found });
};

