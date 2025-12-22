const express = require("express");
const router = express.Router();
const {
  createRoom,
  getRoomsByLocation,
  getRoomById,
} = require("../controllers/roomController");

router.post("/", createRoom);
router.get("/", getRoomsByLocation);
router.get("/:id", getRoomById);

module.exports = router;
