const Room = require("../models/Room");
const Location = require("../models/Location");


exports.createRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getRoomsByLocation = async (req, res) => {
  try {
    const { locationId } = req.query;
    const rooms = await Room.find({ locationId });
    res.json(rooms);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    res.json(room);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
