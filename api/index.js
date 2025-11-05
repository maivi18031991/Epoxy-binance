export default async function handler(req, res) {
  try {
    // Tạo target URL từ path yêu cầu
    const target = `https://api.binance.com${req.url.replace("/api", "")}`;
    console.log("Proxying:", target);

    // Gửi request đến Binance
    const response = await fetch(target, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Origin": "https://api.binance.com",
      },
    });

    // Lấy nội dung trả về
    const data = await response.text();

    // Trả lại client
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(response.status).send(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: error.message });
  }
}
