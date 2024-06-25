import { GridFsStorage } from 'multer-gridfs-storage';
import multer from 'multer';

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

export default upload;