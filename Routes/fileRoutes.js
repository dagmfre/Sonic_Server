const express = require("express");
const accessControl = require("../Utils/accessControl");
const { getFile, deleteFile } = require("../Controllers/fileController");

const router = express.Router();

router.get("/:filename", accessControl("files", "readOwn"), getFile);
router.delete("/:fileNames", accessControl("files", "deleteOwn"), deleteFile);

module.exports = router;
