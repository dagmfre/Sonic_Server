const express = require("express");
const { getArtists } = require("../controllers/artistTracksController");

const router = express.Router();

router.get("/", getArtists);

module.exports = router;
