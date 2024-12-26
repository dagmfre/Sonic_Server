import { GridFSBucket } from "mongodb";
import conn from "./db.js";

let bucketPromise = new Promise((resolve, reject) => {
  conn.once("open", () => {
    const bucket = new GridFSBucket(conn.db, { bucketName: "uploads" });
    resolve(bucket);
  });

  conn.on("error", (error) => {
    reject(error);
  });
});

export default bucketPromise;
