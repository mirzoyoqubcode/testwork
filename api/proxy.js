import axios from "axios";
import https from "https";

const API_BASE_URL = "https://109.73.206.144:6969";
const API_KEY = "E6kUTYrYwZq2tN4QEtyzsbEBk3ie";

// Create axios instance with SSL configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false, // Allow self-signed certificates
    secureProtocol: "TLSv1_2_method", // Use TLS 1.2
    ciphers: "ALL" // Allow all ciphers
  }),
  headers: {
    "Content-Type": "application/json",
    "User-Agent": "Vercel-Proxy/1.0"
  }
});

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
    const targetUrl = `/api/${path}`;

    // Add API key to query parameters
    const params = new URLSearchParams(queryParams);
    params.append("key", API_KEY);

    console.log(`Making request to: ${API_BASE_URL}${targetUrl}?${params.toString()}`);

    // Make request to backend
    const response = await api.get(`${targetUrl}?${params.toString()}`);

    // Return the response data
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Proxy error details:", {
      message: error.message,
      code: error.code,
      response: error.response?.data,
      status: error.response?.status
    });

    res.status(error.response?.status || 500).json({
      error: "Proxy request failed",
      message: error.message,
      code: error.code,
      details: error.response?.data || "No additional details"
    });
  }
}
