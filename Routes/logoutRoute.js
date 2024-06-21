const express = require("express");
const logoutController = require("./logoutController");

const router = express.Router();

router.get("/logout", logoutController);

module.exports = router;
