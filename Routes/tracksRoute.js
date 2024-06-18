const express = require("express");
const { getTracks } = require("../Controllers/artistTracksController");

const router = express.Router();

router.get("/", getTracks);

module.exports = router;
