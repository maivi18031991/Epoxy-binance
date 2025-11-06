// /api/binance.js
export default async function handler(req, res) {
  try {
    // Gộp đường dẫn client gọi vào
    const path = req.url.replace(/^\/api/, "");
    const target = "https://api.binance.me" + path;

    const r = await fetch(target, {
      headers: { "User-Agent": "SpotProxy/1.0" },
    });

    const data = await r.text();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Content-Type",
      r.headers.get("content-type") || "application/json"
    );
    res.status(r.status).send(data);

    console.log(`[PROXY] ${target} → ${r.status}`);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
