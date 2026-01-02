require("dotenv").config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");

const app = express();

/* ---------- DB CONNECT ---------- */
connectDB();

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json());

/* ---------- HEALTH CHECK ---------- */
app.get("/", (req, res) => {
  res.send("Backend is running");
});

/* ---------- AUTH ROUTES ---------- */
app.use("/api/auth", authRoutes);

/* ---------- ML PREDICT ROUTE ---------- */
app.post("/api/predict", async (req, res) => {
  try {
    const response = await axios.post(
      "https://disease-predictor-1-tqst.onrender.com/predict",
      req.body
    );
    res.json(response.data);
  } catch (error) {
    console.error("ML API error:", error.response?.data || error.message);
    res.status(500).json({ error: "ML prediction failed" });
  }
});

/* ---------- START SERVER ---------- */
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
