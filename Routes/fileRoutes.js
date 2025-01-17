import express from "express";
import accessControl from "../Utils/accessControl.js";
import { getFile, deleteFile } from "../Controllers/fileController.js";
import User from "../Models/Users/userModel.js";

const router = express.Router();

const isOwner = async (filename, sender) => {
  try {
    // Find a user who owns the file, either audio or image
    let fileOwner;
    if (
      filename.endsWith(".jpg") ||
      filename.endsWith(".jpeg") ||
      filename.endsWith(".png") ||
      filename.endsWith(".gif")
    ) {
      fileOwner = await User.findOne({
        "uploadedSongs.imageFileName": filename,
      });
    } else if (filename.endsWith(".mp3")) {
      fileOwner = await User.findOne({
        "uploadedSongs.audioFileName": filename,
      });
    }

    if (!fileOwner) {
      throw new Error("File owner not found");
    }

    return sender.id === fileOwner.id;
  } catch (error) {
    next({
      error,
      status: 500,
      message: "Ownership verification failed: " + error.message,
    });
  }
};

const isOwnerDeleting = async (fileNames, sender) => {
  try {
    if (!fileNames) {
      throw new Error("fileNames is undefined");
    }

    const splittedFileNames = fileNames.split(",");

    const [audioFileName, imageFileName] = splittedFileNames;
    const audioOwner = await User.findOne({
      "uploadedSongs.audioFileName": audioFileName,
    });
    const imageOwner = await User.findOne({
      "uploadedSongs.imageFileName": imageFileName,
    });

    if (!audioOwner || !imageOwner || audioOwner.id !== imageOwner.id) {
      throw new Error("File owner not found or mismatch");
    }

    return sender.id === audioOwner.id && sender.id === imageOwner.id;
  } catch (error) {
    next({
      error,
      status: 500,
      message: "Ownership verification failed: " + error.message,
    });
  }
};

router.get("/:filename", getFile);
router.delete("/:filename", deleteFile);

export default router;
