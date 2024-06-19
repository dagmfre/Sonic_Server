const Song = require("../Models/Song/Song");

const songUploader = async (req, res, next) => {
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
    next({
      status: 500,
      error: "Error uploading song",
    });
  }
};

module.exports = { songUploader };
