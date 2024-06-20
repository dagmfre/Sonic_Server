const express = require("express");
const signupController = require("../Controllers/signupController");

const router = express.Router();

router.post("/", signupController);

module.exports = router;
