const { GridFSBucket } = require("mongodb");
const conn = require("./db");
let bucket;

conn.once("open", () => {
  bucket = new GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
});

module.exports = { bucket };
