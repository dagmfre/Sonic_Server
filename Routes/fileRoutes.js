const express = require("express");
const { getFile, deleteFile } = require("../Controllers/fileController");

const router = express.Router();

router.get("/:filename", getFile);
router.delete("/:fileNames", deleteFile);

module.exports = router;
