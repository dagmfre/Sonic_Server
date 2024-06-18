const { conn } = require("../Config/db");
const { bucket } = require("../Config/gridFs");

const Song = require("../Models/Song");

const getFile = async (req, res) => {
  try {
    const file = await conn.db
      .collection("uploads.files")
      .getSongByAudioFileName({ filename: req.params.filename });

    if (!file) {
      console.error("File not found");
      return res.status(404).json({ message: "File not found" });
    }

    const readstream = bucket.openDownloadStreamByName(file.filename);
    readstream.on("error", (err) => {
      console.error("Error while streaming image:", err);
      return res.status(500).json({ message: "Error streaming image" });
    });
    readstream.pipe(res);
  } catch (err) {
    console.error("Error fetching image:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteFile = async (req, res) => {
  const fileNames = req.params.fileNames.split(",");

  try {
    const [audioFileName, imageFileName] = fileNames;
    await Song.deleteSongByAudioFileName({ audioFileName: audioFileName });
    const audioFile = await conn.db
      .collection("uploads.files")
      .getSongByAudioFileName({ filename: audioFileName });
    const imageFile = await conn.db
      .collection("uploads.files")
      .getSongByAudioFileName({ filename: imageFileName });

    if (audioFile) {
      try {
        await bucket.delete(audioFile._id);
      } catch (error) {
        console.error(error);
      }
    }
    if (imageFile) {
      try {
        await bucket.delete(imageFile._id);
      } catch (error) {
        console.error(error);
      }
    }

    return res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getFile, deleteFile };
