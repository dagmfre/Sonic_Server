const Song = require("../Models/Song/Song");
const User = require("../Models/Users/userModel");

const songUploader = async (req, res, next) => {
  const { title, singer, imageFileName, audioFileName } = req.body;
  const token = req.cookies.token;
  const secret = process.env.SECRET_KEY;
  const decoded = jwt.verify(token, secret);
  const userId = decoded.userId;

  const newSong = new Song({
    title,
    singer,
    imageFileName,
    audioFileName,
  });

  try {
    const savedSong = await newSong.uploadSong(newSong);
    await User.findByIdAndUpdate(userId, {
      $push: { uploadedSongs: savedSong._id },
    });
    console.log("Song Saved Successfully");
    res.send(newSong);
  } catch (err) {
    console.error("Error saving song:", err);
    next({
      status: 500,
      error: "Error uploading song",
    });
  }
};

module.exports = { songUploader };
