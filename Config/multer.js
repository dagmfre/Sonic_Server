const { GridFsStorage } = require("multer-gridfs-storage");
const multer = require("multer");

const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  file: (req, file) => {
    return {
      filename: Buffer.from(file.originalname, "utf8").toString(),
      bucketName: "uploads",
    };
  },
});

const upload = multer({ storage });

module.exports = upload;