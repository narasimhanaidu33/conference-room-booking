const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();

/**
 * ---------------------------------------------------
 * 🔴 1. HARD PRE-FLIGHT HANDLER (ABSOLUTE FIRST)
 * ---------------------------------------------------
 * This guarantees OPTIONS requests NEVER hang.
 * No wildcards, no router matching, no crashes.
 */
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.sendStatus(200);
  }
  next();
});

/**
 * ---------------------------------------------------
 * 🔴 2. STANDARD CORS (FOR REAL REQUESTS)
 * ---------------------------------------------------
 */
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/**
 * ---------------------------------------------------
 * 🔴 3. BODY PARSER
 * ---------------------------------------------------
 */
app.use(express.json());

/**
 * ---------------------------------------------------
 * 🔴 4. ROUTES
 * ---------------------------------------------------
 */
app.use("/api/auth", authRoutes);

/**
 * ---------------------------------------------------
 * 🔴 5. HEALTH CHECK (OPTIONAL BUT USEFUL)
 * ---------------------------------------------------
 */
app.get("/health", (req, res) => {
  res.json({ status: "Auth service running" });
});

/**
 * ---------------------------------------------------
 * 🔴 6. DATABASE CONNECTION
 * ---------------------------------------------------
 */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected (Auth Service)"))
  .catch((err) => console.error("MongoDB error:", err.message));

module.exports = app;

