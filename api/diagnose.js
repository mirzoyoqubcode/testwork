import axios from "axios";
import https from "https";

const API_BASE_URL = "https://109.73.206.144:6969";
const API_KEY = "E6kUTYrYwZq2tN4QEtyzsbEBk3ie";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const results = {
    timestamp: new Date().toISOString(),
    tests: {},
  };

  // Test 1: HTTPS with SSL verification disabled
  try {
    const httpsResponse = await axios.get(
      `${API_BASE_URL}/api/sales?key=${API_KEY}`,
      {
        timeout: 10000,
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
          secureProtocol: "TLSv1_2_method",
        }),
      }
    );
    results.tests.https_ssl_disabled = {
      success: true,
      status: httpsResponse.status,
      data_length: JSON.stringify(httpsResponse.data).length,
    };
  } catch (error) {
    results.tests.https_ssl_disabled = {
      success: false,
      error: error.message,
      code: error.code,
      status: error.response?.status,
    };
  }

  // Test 2: HTTP
  try {
    const httpResponse = await axios.get(
      `http://109.73.206.144:6969/api/sales?key=${API_KEY}`,
      {
        timeout: 10000,
      }
    );
    results.tests.http = {
      success: true,
      status: httpResponse.status,
      data_length: JSON.stringify(httpResponse.data).length,
    };
  } catch (error) {
    results.tests.http = {
      success: false,
      error: error.message,
      code: error.code,
      status: error.response?.status,
    };
  }

  // Test 3: Basic connectivity test
  try {
    const pingResponse = await axios.get(`http://109.73.206.144:6969/`, {
      timeout: 5000,
    });
    results.tests.connectivity = {
      success: true,
      status: pingResponse.status,
    };
  } catch (error) {
    results.tests.connectivity = {
      success: false,
      error: error.message,
      code: error.code,
    };
  }

  res.status(200).json(results);
}
