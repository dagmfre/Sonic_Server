const express = require("express");
const logoutController = require("../Controllers/logoutController");

const router = express.Router();

router.get("/logout", logoutController);

module.exports = router;
