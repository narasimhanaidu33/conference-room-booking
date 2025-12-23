require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected (Booking Service)"))
  .catch(err => console.error(err));

app.use("/api/bookings", require("./routes/bookingRoutes"));

module.exports = app;
