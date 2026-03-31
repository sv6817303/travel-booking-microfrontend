const flights = require('../data/flightsMockData');

function normalize(s) {
  return String(s || '').trim().toLowerCase();
}

exports.listFlights = (req, res) => {
  const { from, to } = req.query;

  const fromQ = normalize(from);
  const toQ = normalize(to);

  const filtered = flights.filter((f) => {
    const fromOk = fromQ ? normalize(f.from).includes(fromQ) : true;
    const toOk = toQ ? normalize(f.to).includes(toQ) : true;
    return fromOk && toOk;
  });

  res.json({ success: true, data: filtered });
};

