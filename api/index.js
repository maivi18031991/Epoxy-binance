export default async function handler(req, res) {
  try {
    const { url } = req;
    const target = `https://api.binance.com${url.replace("/api", "")}`;

    const response = await fetch(target, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Origin': 'https://api.binance.com',
        'Access-Control-Allow-Origin': '*'
      }
    });

    const data = await response.text();

    res.status(response.status).send(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
