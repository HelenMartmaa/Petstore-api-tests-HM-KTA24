const axios = require("axios");

// Axios instance pointed at the Petstore API.
// validateStatus: null — axios won't throw on 4xx/5xx so we can assert on status codes ourselves.
const client = axios.create({
  baseURL: "https://petstore.swagger.io/v2",
  timeout: 20000, // since API might be slow at times
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  validateStatus: null,
});

module.exports = client;
