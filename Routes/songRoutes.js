const express = require("express");
const { songUploader } = require("../Controllers/songController");
const { upload } = require("../Utils/multer");

const router = express.Router();

router.post("/songs", upload.fields([{ name: "image" }, { name: "song" }]), songUploader);

module.exports = router;