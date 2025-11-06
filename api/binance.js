// /api/binance.js
export default async function handler(req, res) {
  try {
    // Lấy phần path sau /api/binance (ví dụ: /v3/ticker/24hr)
    const url = new URL(req.url, `http://${req.headers.host}`);
    const endpoint = url.search ? url.pathname + url.search : url.pathname;
    const cleanPath = endpoint.replace(/^\/api\/binance/, ""); // bỏ tiền tố

    // Gọi sang Binance
    const target = "https://api.binance.me" + cleanPath;
    const r = await fetch(target, {
      headers: { "User-Agent": "SpotProxy/1.0" },
    });

    const data = await r.text();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", r.headers.get("content-type") || "application/json");
    res.status(r.status).send(data);

    console.log(`[PROXY] ${target} → ${r.status}`);
  } catch (e) {
    console.error("[PROXY ERROR]", e.message);
    res.status(500).json({ error: e.message });
  }
}
