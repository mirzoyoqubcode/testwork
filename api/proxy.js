import axios from "axios";

const API_BASE_URL = "https://109.73.206.144:6969";
const API_KEY = "E6kUTYrYwZq2tN4QEtyzsbEBk3ie";

export default async function handler(req, res) {
  // Enable CORS for all origins
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    const { path, ...queryParams } = req.query;

    // Build the target URL
    const targetUrl = `${API_BASE_URL}/api/${path}`;

    // Add API key to query parameters
    const params = new URLSearchParams(queryParams);
    params.append("key", API_KEY);

    // Make request to backend
    const response = await axios.get(`${targetUrl}?${params.toString()}`, {
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Return the response data
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Proxy error:", error.message);
    res.status(error.response?.status || 500).json({
      error: "Proxy request failed",
      message: error.message,
    });
  }
}
