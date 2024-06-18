const express = require("express");
const { getTopArtists } = require("../controllers/artistTracksController");

const router = express.Router();

router.get("/", getTopArtists);

module.exports = router;
