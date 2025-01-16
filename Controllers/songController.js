import User from "../Models/Users/userModel.js";
import jwt from "jsonwebtoken";

const songUploader = async (req, res, next) => {
  const { title, singer, imageFileName, audioFileName } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  // Verify token
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const newSong = {
    title,
    singer,
    imageFileName,
    audioFileName,
  };

  try {
    const savedSong = await User.findByIdAndUpdate(
      decoded.id,
      {
        $push: { uploadedSongs: newSong },
      },
      { new: true }
    );
    console.log("Song Saved Successfully");
    res.send(savedSong);
  } catch (error) {
    console.log("Error saving song:", error);
    next({
      error,
      status: 500,
      error: "Error uploading song: " + error.message,
    });
  }
};

export default songUploader;
