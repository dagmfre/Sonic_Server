import express from "express";
import accessControl from "../Utils/accessControl.js";
import { getFile, deleteFile } from "../Controllers/fileController.js";
import User from "../Models/Users/userModel.js";

const router = express.Router();
const isOwner = async (filename, sender) => {
  // Find a user who owns the file, either audio or image
  const fileOwner = await User.findOne({
    $or: [
      { "uploadedSongs.audioFileName": filename },
      { "uploadedSongs.imageFileName": filename },
    ],
  });
  const isOwner = sender.id === fileOwner.id;
  return isOwner;
};

router.get("/:filename", accessControl("files", "readOwn", isOwner), getFile);
router.delete(
  "/:fileNames",
  accessControl("files", "deleteOwn", isOwner),
  deleteFile
);

export default router;
