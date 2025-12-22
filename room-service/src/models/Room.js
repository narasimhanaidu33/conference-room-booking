const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  locationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true
  },
  capacity: { type: Number, required: true },
  basePrice: { type: Number, required: true }
});

module.exports = mongoose.model("Room", RoomSchema);
