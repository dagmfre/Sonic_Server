import express from "express";
import songUploader from "../Controllers/songController.js";
import upload from "../Config/multer.js";
import validateSong from "../Validations/validateSong.js";
import { validationResult } from "express-validator";
import accessControl from "../Utils/accessControl.js";
import User from "../Models/Users/userModel.js";

const router = express.Router();

const checkValidation = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.status = 400;
      error.details = errors.array();
      return next(error);
    }
    next();
  } catch (error) {
    next({
      error,
      status: 400,
      message: "Validation failed: " + error.message,
    });
  }
};

const isOwner = async (fileName, sender) => {
  try {
    const fileOwner = await User.findById(sender?.id);
    if (!fileOwner) {
      throw new Error("User not found");
    }
    const isOwner = sender?.id === fileOwner?.id;
    return isOwner;
  } catch (error) {
    throw new Error(`Ownership verification failed: ${error.message}`);
  }
};

// Error handler for multer upload errors
const handleUpload = (req, res, next) => {
  return upload.fields([{ name: "image" }, { name: "song" }])(
    req,
    res,
    (error) => {
      if (error) {
        const error = new Error(`File upload failed: ${error.message}`);
        error.status = 400;
        return next(error);
      }
      next();
    }
  );
};

router.post(
  "/",
  handleUpload,
  async (req, res, next) => {
    try {
      await accessControl("songs", "createOwn", isOwner)(req, res, next);
    } catch (error) {
      next({
        error,
        status: 500,
        message: "Access control failed: " + error.message,
      });
    }
  },
  validateSong,
  checkValidation,
  async (req, res, next) => {
    try {
      await songUploader(req, res, next);
    } catch (error) {
      next({
        error,
        status: 500,
        message: "Error uploading song: " + error.message,
      });
    }
  }
);

export default router;
