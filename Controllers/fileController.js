const Song = require("../Models/Song/Song");
const conn = require("../Config/db");
const bucketPromise = require("../Config/gridFs");

const getFile = async (req, res, next) => {
  try {
    const file = await conn.db
      .collection("uploads.files")
      .findOne({ filename: req.params.filename });

    if (!file) {
      console.error("File not found");
      return res.status(404).json({ message: "File not found" });
    }

    const bucket = await bucketPromise;
    const readstream = bucket.openDownloadStreamByName(file.filename);

    readstream.on("error", (err) => {
      console.error("Error while streaming image:", err);
      next({
        status: 500,
        error: "Error streaming image",
      });
    });

    readstream.pipe(res);
  } catch (err) {
    console.error("Error fetching image:", err);
    next({
      status: 500,
      error: "Internal server error",
    });
  }
};

const deleteFile = async (req, res, next) => {
  const fileNames = req.params.fileNames.split(",");
  const bucket = await bucketPromise;

  try {
    const [audioFileName, imageFileName] = fileNames;
    await Song.deleteSongMetaDataByFileName(audioFileName);

    const audioFile = await conn.db
      .collection("uploads.files")
      .findOne({ filename: audioFileName });
    const imageFile = await conn.db
      .collection("uploads.files")
      .findOne({ filename: imageFileName });

    if (audioFile) {
      try {
        await bucket.delete(audioFile._id);
      } catch (error) {
        console.error("Error deleting audio file from bucket:", error);
        next({
          status: 500,
          error: "Error deleting audio file from bucket",
        });
      }
    }

    if (imageFile) {
      try {
        await bucket.delete(imageFile._id);
      } catch (error) {
        console.error("Error deleting image file from bucket:", error);
        next({
          status: 500,
          error: "Error deleting image file from bucket",
        });
      }
    }

    return res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    next({
      status: 500,
      error: "Internal server error",
    });
  }
};
module.exports = { getFile, deleteFile };
