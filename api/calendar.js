export default async function handler(req, res) {
  try {
    const response = await fetch(
      'https://api.nango.dev/proxy/calendar/v3/users/me/calendarList?maxResults=10',
      {
        headers: {
          Authorization: `Bearer ${process.env.NANGO_SECRET_KEY}`,
          'Provider-Config-Key': 'google-calendar',
          'Connection-Id': 'c45703d9-e778-43a3-a2ed-18ae33432fa2'
        }
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
