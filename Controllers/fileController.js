import conn from "../Config/db.js";
import bucketPromise from "../Config/gridFs.js";
import User from "../Models/Users/userModel.js";

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

    readstream.on("error", (error) => {
      console.error("Error while streaming image:", error);
      next({ error, status: 500, message: "Error streaming image" });
    });

    readstream.pipe(res);
  } catch (error) {
    console.error("Error fetching image:", error);
    next({ error, status: 500, message: "Internal server error" });
  }
};

const deleteFile = async (req, res, next) => {
  const fileNames = req.params.filename.split(",");
  const bucket = await bucketPromise;

  try {
    const [audioFileName, imageFileName] = fileNames;
    console.log(audioFileName, imageFileName);

    try {
      await User.updateOne(
        { "uploadedSongs.audioFileName": audioFileName },
        { $pull: { uploadedSongs: { audioFileName: audioFileName } } }
      );
    } catch (error) {
      console.error("Error deleting song from database:", error);
      return next({
        error,
        status: 500,
        message: "Error deleting song from database",
      });
    }

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
        return next({
          error,
          status: 500,
          message: "Error deleting audio file from bucket",
        });
      }
    }

    if (imageFile) {
      try {
        await bucket.delete(imageFile._id);
      } catch (error) {
        console.error("Error deleting image file from bucket:", error);
        return next({
          error,
          status: 500,
          message: "Error deleting image file from bucket",
        });
      }
    }

    return res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    next({ error, status: 500, message: "Internal server error" });
  }
};

export { getFile, deleteFile };
