import express from "express";
import accessControl from "../Utils/accessControl.js";
import { getFile, deleteFile } from "../Controllers/fileController.js";
import User from "../Models/Users/userModel.js";

const router = express.Router();

const isOwner = async (filename, sender) => {
  try {
    // Find a user who owns the file, either audio or image
    const fileOwner = await User.findOne({
      $or: [
        { "uploadedSongs.audioFileName": filename },
      ],
    });

    if (!fileOwner) {
      throw new Error("File owner not found");
    }

    console.log(sender.id === fileOwner.id);
    

    return sender.id === fileOwner.id;
  } catch (error) {
    console.error("Ownership verification failed:", error.message);
    throw new Error(`Ownership verification failed: ${error.message}`);
  }
};

router.get("/:filename", accessControl("files", "readOwn", isOwner), getFile);
router.delete(
  "/:filename",
  accessControl("files", "deleteOwn", isOwner),
  deleteFile
);

export default router;
