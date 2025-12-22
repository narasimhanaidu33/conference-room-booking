require("dotenv").config();
const mongoose = require("mongoose");
const Location = require("./models/Location");
const Room = require("./models/Room");

const seedData = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await Location.deleteMany();
  await Room.deleteMany();

  const dundee = await Location.create({ name: "Dundee Centre", city: "Dundee" });
  const edinburgh = await Location.create({ name: "Edinburgh Hub", city: "Edinburgh" });

  await Room.create([
    { locationId: dundee._id, capacity: 10, basePrice: 100 },
    { locationId: dundee._id, capacity: 20, basePrice: 180 },
    { locationId: edinburgh._id, capacity: 15, basePrice: 150 }
  ]);

  console.log("Room & Location data seeded");
  process.exit();
};

seedData();
