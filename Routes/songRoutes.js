const express = require("express");
const { songUploader } = require("../Controllers/songController");
const { upload } = require("../Config/multer");

const router = express.Router();

router.post("/", upload.fields([{ name: "image" }, { name: "song" }]), songUploader);

module.exports = router;