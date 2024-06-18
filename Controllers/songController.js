const Song = require("../Models/Song/Song");

const songUploader = async (req, res) => {
  const { title, singer, imageFileName, audioFileName } = req.body;

  const newSong = new Song({
    title,
    singer,
    imageFileName,
    audioFileName,
  });

  try {
    await newSong.uploadSong(newSong);
    console.log("Song Saved Successfully");
    res.send(newSong);
  } catch (err) {
    console.error("Error saving song:", err);
    res.status(500).json({ message: "Error uploading song" });
  }
};

module.exports = { songUploader };