// filepath: /d:/ONLINE-COURSE/Web_Development/PROJECTS/Sonic/Sonic Server/Controllers/songController.js
import Song from "../Models/Song/Song.js";
import User from "../Models/Users/userModel.js";
import jwt from "jsonwebtoken";

const songUploader = async (req, res, next) => {
  const { title, singer, imageFileName, audioFileName } = req.body;
  const token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const newSong = new Song({
    title,
    singer,
    imageFileName,
    audioFileName,
  });

  try {
    const savedSong = await newSong.uploadSong(); 
    await User.findByIdAndUpdate(decoded.id, {
      $push: { uploadedSongs: newSong },
    });
    console.log("Song Saved Successfully", savedSong);
    res.send(savedSong);
  } catch (error) {
    console.log("Error saving song:", error);
    next({ error, status: 500, error: "Error uploading song: " + error.message });
  }
};

export default songUploader;