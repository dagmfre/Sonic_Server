const Song = require("../Models/Song/Song");
const User = require("../Models/Users/userModel");
const jwt = require("jsonwebtoken");

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
    const savedSong = await newSong.uploadSong(newSong);
    await User.findByIdAndUpdate(decoded.id, {
      $push: { uploadedSongs: newSong },
    });
    console.log("Song Saved Successfully", savedSong);
    res.send(savedSong);
  } catch (err) {
    console.error("Error saving song:", err);
    next({
      status: 500,
      error: "Error uploading song" + error,
    });
  }
};

module.exports = { songUploader };
