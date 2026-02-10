export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const response = await fetch(
      'https://api.nango.dev/proxy/calendar/v3/users/me/calendarList',
      {
        headers: {
          Authorization: `Bearer ${process.env.NANGO_SECRET_KEY}`,
          'Provider-Config-Key': 'google-calendar',
          'Connection-Id': 'c45703d9-e778-43a3-a2ed-18ae33432fa2'
        }
      }
    );

    const data = await response.json();

    // Force proper JSON response for Vapi
    res.status(200).setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
  } catch (error) {
    console.error('Calendar API error:', error);
    res.status(500).json({ error: error.message });
  }
}
