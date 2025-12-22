const express = require("express");
const router = express.Router();
const {
  createLocation,
  getLocations,
  getLocationById
} = require("../controllers/locationController");

router.post("/", createLocation);
router.get("/", getLocations);
router.get("/:id", getLocationById);

module.exports = router;

