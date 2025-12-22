require("dotenv").config();
const express = require("express");
const { getSimulatedTemperature } = require("./weatherLogic");

const app = express();

app.get("/api/weather", (req, res) => {
  const { location, date } = req.query;

  if (!location || !date) {
    return res.status(400).json({ error: "location and date are required" });
  }

  const temperature = getSimulatedTemperature(location, date);

  res.json({
    location,
    date,
    temperature
  });
});

module.exports = app;
