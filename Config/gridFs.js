const { GridFSBucket } = require("mongodb");
const conn = require("./db");

let bucketPromise = new Promise((resolve, reject) => {
    conn.once("open", () => {
        const bucket = new GridFSBucket(conn.db, { bucketName: "uploads" });
        resolve(bucket);
    });

    conn.on("error", (err) => {
        reject(err);
    });
});

module.exports = bucketPromise;