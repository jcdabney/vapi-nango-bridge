import fetch from 'node-fetch'; // only if required

export default function handler(req, res) {
  // Allow Vapi to access
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Fetch from Nango
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
      res.status(200).end(JSON.stringify(data)); // END the response
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: error.message });
    });
}
