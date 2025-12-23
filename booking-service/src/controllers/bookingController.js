const Booking = require("../models/Booking");
const axios = require("axios");
const { calculateFinalPrice } = require("./pricingLogic");
const mongoose = require("mongoose");

exports.createBooking = async (req, res) => {
  try {
    const { roomId, date } = req.body;

    // 🔍 LOG 1: What does auth middleware give us?
    console.log("CREATE BOOKING req.user:", req.user);

    const userId = req.user.userId;
    console.log("CREATE BOOKING extracted userId:", userId);

    // 1️⃣ Prevent double booking
    const existing = await Booking.findOne({ roomId, date });
    if (existing) {
      return res
        .status(400)
        .json({ error: "Room already booked for this date" });
    }

    // 2️⃣ Fetch room from Room Service
    const roomResponse = await axios.get(
      `${process.env.ROOM_SERVICE_URL}/api/rooms/${roomId}`
    );

    const room = roomResponse.data;
    console.log("ROOM FETCHED:", room);

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    // 3️⃣ Fetch location from Room Service
    const locationResponse = await axios.get(
      `${process.env.ROOM_SERVICE_URL}/api/locations/${room.locationId}`
    );

    console.log("LOCATION FETCHED:", locationResponse.data);

    const locationName = locationResponse.data.name;

    // 4️⃣ Fetch weather
    const weatherResponse = await axios.get(
      `${process.env.WEATHER_SERVICE_URL}/weather`,
      {
        params: { location: locationName, date },
      }
    );

    console.log("WEATHER RESPONSE:", weatherResponse.data);

    const temperature = weatherResponse.data.temperature;

    // 5️⃣ Calculate final price
    const finalPrice = calculateFinalPrice(room.basePrice, temperature);

    // 6️⃣ Save booking
    const booking = await Booking.create({
      userId, // 👈 stored as STRING currently
      roomId,
      date,
      finalPrice,
      temperature,
    });

    console.log("BOOKING SAVED:", booking);

    // 7️⃣ Return response
    res.status(201).json({
      bookingId: booking._id,
      finalPrice,
      temperature,
    });
  } catch (err) {
    console.error("BOOKING ERROR FULL:", err);
    res.status(500).json({ error: "Failed to create booking" });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.userId);

    const bookings = await Booking.find({ userId });

    // Enrich bookings with location name
    const enrichedBookings = await Promise.all(
      bookings.map(async (booking) => {
        // 1️⃣ Fetch room
        const roomResponse = await axios.get(
          `${process.env.ROOM_SERVICE_URL}/api/rooms/${booking.roomId}`
        );

        const room = roomResponse.data;

        // 2️⃣ Fetch location
        const locationResponse = await axios.get(
          `${process.env.ROOM_SERVICE_URL}/api/locations/${room.locationId}`
        );

        return {
          ...booking.toObject(),
          locationName: locationResponse.data.name,
        };
      })
    );

    res.json(enrichedBookings);
  } catch (err) {
    console.error("MY BOOKINGS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};
