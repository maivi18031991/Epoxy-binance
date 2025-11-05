export default async function handler(req, res) {
  try {
    // Xóa /api trong đường dẫn để tạo link tới Binance
    const path = req.url.startsWith('/api') ? req.url.slice(4) : req.url;
    const target = `https://api.binance.com${path}`;

    console.log("Proxying request to:", target);

    const response = await fetch(target, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Origin": "https://api.binance.com"
      }
    });

    const data = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(response.status).send(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: error.message });
  }
}
