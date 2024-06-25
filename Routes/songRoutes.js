import express from 'express';
import songUploader from '../Controllers/songController.js';
import upload from '../Config/multer.js';
import validateSong from '../Validations/validateSong.js';
import validationResult from 'express-validator';
import accessControl from '../Utils/accessControl.js';
import User from '../Models/Users/userModel.js';

const router = express.Router();

const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const isOwner = async (filename, sender) => {
  // Find a user who owns the file, either audio or image
  const fileOwner = await User.findById(sender.id);
  console.log(fileOwner, sender);
  const isOwner = sender.id === fileOwner.id;
  return isOwner;
};

router.post(
  "/",
  upload.fields([{ name: "image" }, { name: "song" }]),
  accessControl("songs", "createOwn", isOwner),
  validateSong,
  checkValidation,
  songUploader
);

export default router;
