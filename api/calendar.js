export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Check that NANGO_SECRET_KEY exists
  if (!process.env.NANGO_SECRET_KEY) {
    console.error('NANGO_SECRET_KEY is missing!');
    res.status(500).json({ error: 'Missing NANGO_SECRET_KEY in environment variables' });
    return;
  }

  fetch('https://api.nango.dev/proxy/calendar/v3/users/me/calendarList', {
    headers: {
      Authorization: `Bearer ${process.env.NANGO_SECRET_KEY}`,
      'Provider-Config-Key': 'google-calendar',
      'Connection-Id': 'c45703d9-e778-43a3-a2ed-18ae33432fa2'
    }
  })
    .then((response) => response.json())
    .then((data) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).end(JSON.stringify(data));
    })
    .catch((error) => {
      console.error('Calendar fetch error:', error);
      res.status(500).json({ error: error.message });
    });
}
