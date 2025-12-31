const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Predict route (Node → Flask)
app.post("/api/predict", async (req, res) => {
  try {
    // Forward request to Flask ML API
    const response = await axios.post(
      "http://127.0.0.1:8000/predict",
      req.body
    );

    // Send ML response back to client
    res.json(response.data);

  } catch (error) {
    console.error("ML API error:", error.response?.data || error.message);

    res.status(500).json({
      error: "Backend failed to get prediction from ML API"
    });
  }
});

// Start backend server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
