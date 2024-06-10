const mongoose = require("mongoose");
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const multer = require("multer");
require("dotenv").config();
const { GridFsStorage } = require("multer-gridfs-storage");
const { GridFSBucket } = require("mongodb");

// connecting to mongodb server
const mongodbConnectionString = process.env.MONGODB_URI;

mongoose.connect(mongodbConnectionString);

const conn = mongoose.connection;
let bucket;

conn.once("open", () => {
  bucket = new GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
});

const storage = new GridFsStorage({
  url: mongodbConnectionString,
  file: (req, file) => {
    return {
      filename: Buffer.from(file.originalname, "utf8").toString(),
      bucketName: "uploads",
    };
  },
});

const upload = multer({ storage });

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
const corsOptions ={
    origin:'https://sonic-client.vercel.app', 
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

const SongSchema = new mongoose.Schema({
  title: String,
  singer: String,
  imageFileName: String,
  audioFileName: String,
});

const Song = mongoose.model("Song", SongSchema);

app.get("/", (req, res) => {
  res.send("Hi from '/' the root");
});

app.get("/api/topArtists", async (req, res) => {
  try {
    const response = await axios.get("https://api.deezer.com/genre/0/artists");
    const artistIds = response?.data?.data?.map((artistData) => artistData.id) || [];
    const firstTenArtistIds = artistIds.slice(0, 10);
    const artistTopSongs = firstTenArtistIds.map(async (artistId) => {
      try {
        const response2 = await axios.get(
          `https://api.deezer.com/artist/${artistId}/top?limit=10`
        );
        return response2.data;
      } catch (error) {
        console.error(
          `Error fetching top songs for artist ${artistId}:`,
          error.response.data
        );
        return null;
      }
    });

    const resolvedArtistTopSongs = await Promise.allSettled(artistTopSongs);
    const validSongs = resolvedArtistTopSongs
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);

    res.json(validSongs);
  } catch (error) {
    console.log("Error fetching artist data:", error.response.data);
    res
      .status(500)
      .json(
        { errorMsg: "Internal server error" },
        { error: error.response.data }
      );
  }
});

app.get("/api/artists", async (req, res) => {
  try {
    const response = await axios.get("https://api.deezer.com/genre/2/artists");
    res.json(response.data?.data.slice(0, 10));
  } catch (error) {
    console.error(error.response.data);
  }
});

app.get("/api/tracks", async (req, res) => {
  try {
    const response = await axios.get(
      "https://sonic-server-koyed-26491528.koyeb.app/api/topArtists"
    );
    const artistsData = response.data?.map((artist, index) => artist.data[1]);

    const trackListPromises = artistsData.map(async (artist) => {
      try {
        const response2 = await axios.get(artist.artist.tracklist);
        return response2.data;
      } catch (error) {
        console.error(
          `Error fetching albums for artist ${artist.artist.name}:`,
          error.response.data
        );
        return null;
      }
    });

    const resolvedTrackList = await Promise.all(trackListPromises);
    const validTrackList = resolvedTrackList.filter(
      (albums) => albums !== null
    );

    const slicedTrackList = validTrackList.map((tracklist) => ({
      data: tracklist.data.slice(0, 10),
    }));
    res.json(slicedTrackList);
  } catch (error) {
    console.log(error);
  }
});

app.post(
  "/api/songs",
  upload.fields([{ name: "image" }, { name: "song" }]),
  async (req, res) => {
    const { title, singer, imageFileName, audioFileName } = req.body;

    const newSong = new Song({
      title,
      singer,
      imageFileName,
      audioFileName,
    });

    try {
      await newSong
        .save()
        .then(() => console.log("Song Saved Successfully"))
        .catch((err) => console.log("Error Occurred While Saving Song"));
      res.send(newSong);
    } catch (err) {
      console.error("Error saving song:", err);
      res.status(500).json({ message: "Error uploading song" });
    }
  }
);

app.get("/file/:filename", async (req, res) => {
  try {
    const file = await conn.db
      .collection("uploads.files")
      .findOne({ filename: req.params.filename });

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
});

app.delete("/file/:fileNames", async (req, res) => {
  const fileNames = req.params.fileNames.split(",");

  try {
    const [audioFileName, imageFileName] = fileNames;
    await Song.deleteOne({ audioFileName: audioFileName });
    const audioFile = await conn.db
      .collection("uploads.files")
      .findOne({ filename: audioFileName });
    const imageFile = await conn.db
      .collection("uploads.files")
      .findOne({ filename: imageFileName });

    if (audioFile) {
      console.log(audioFile);
      try {
        await bucket.delete(audioFile._id);
      } catch (error) {
        console.error(error);
      }
    }
    if (imageFile) {
      console.log(imageFile);
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
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
