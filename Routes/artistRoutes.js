const express = require("express");
const { getArtists } = require("../Controllers/artistTracksController");

const router = express.Router();

router.get("/", getArtists);

module.exports = router;
