const express = require("express");
const { getTracks } = require("../controllers/artistTracksController");

const router = express.Router();

router.get("/", getTracks);

module.exports = router;
