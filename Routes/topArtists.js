const express = require("express");
const { getTopArtists } = require("../Controllers/artistTracksController");

const router = express.Router();

router.get("/", getTopArtists);

module.exports = router;
