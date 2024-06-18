const express = require("express");
const { getTopArtists } = require("../controllers/artistTracksController");

const router = express.Router();

router.get("/topArtists", getTopArtists);

module.exports = router;
