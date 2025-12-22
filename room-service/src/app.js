require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/locations", require("./routes/locationRoutes"));
app.use("/api/rooms", require("./routes/roomRoutes"));

module.exports = app;
