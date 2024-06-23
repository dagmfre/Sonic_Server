const express = require("express");
const { songUploader } = require("../Controllers/songController");
const upload = require("../Config/multer");
const { validateSong } = require("../Validations/validateSong");
const { validationResult } = require("express-validator");
const accessControl = require("../Utils/accessControl");

const router = express.Router();

const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post(
  "/",
  upload.fields([{ name: "image" }, { name: "song" }]),
  validateSong,
  accessControl("songs", "readOwn"),
  checkValidation,
  songUploader
);

module.exports = router;
