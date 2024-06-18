const express = require("express");
const { getArtists } = require("../controllers/artistTracksController");

const router = express.Router();

router.get("/artists", getArtists);

module.exports = router;
