// /api/index.js
export default async function handler(req, res) {
  try {
    // Lấy phần path sau /api (ví dụ: /v3/ticker/24hr)
    const rawUrl = req.url || "";
    const endpoint = rawUrl.replace(/^\/api/, "") || "/";
    const target = "https://api.binance.me" + endpoint;

    // Gọi sang Binance
    const r = await fetch(target, {
      headers: { "User-Agent": "SpotProxy/1.0" },
    });

    const text = await r.text();

    // Set header để không bị CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Content-Type",
      r.headers.get("content-type") || "application/json"
    );
    res.status(r.status).send(text);

    console.log(`[PROXY] ${target} → ${r.status}`);
  } catch (err) {
    console.error("[PROXY ERROR]", err.message);
    res.status(500).json({ error: err.message });
  }
}
