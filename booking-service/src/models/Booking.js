const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  finalPrice: {
    type: Number,
    required: true
  },
  temperature: {
    type: Number,   // 👈 THIS WAS MISSING
    required: true
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
