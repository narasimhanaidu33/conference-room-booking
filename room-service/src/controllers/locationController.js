const Location = require("../models/Location");

exports.createLocation = async (req, res) => {
  const location = await Location.create(req.body);
  res.status(201).json(location);
};

exports.getLocations = async (req, res) => {
  const locations = await Location.find();
  res.json(locations);
};

exports.getLocationById = async (req, res) => {
  const location = await Location.findById(req.params.id);
  if (!location) return res.status(404).json({ error: "Location not found" });
  res.json(location);
};
