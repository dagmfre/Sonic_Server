const express = require("express");
const { songUploader } = require("../Controllers/songController");
const upload = require("../Config/multer");
const { validateSong } = require("../Validations/validate");
const { validationResult } = require("express-validator");

const router = express.Router();

router.post(
  "/",
  upload.fields([{ name: "image" }, { name: "song" }]),
  validateSong,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    next();
  },
  songUploader
);

module.exports = router;
