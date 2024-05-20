const mongoose = require("mongoose");
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const multer = require("multer");
require("dotenv").config();
const path = require("path"); // For path manipulation

// connecting to mongodb server
const mongodbConnectionString = process.env.MONGODB_URI;

main().catch((err) => console.log(err));
async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/musicAppTest");
    //   await mongoose.connect(mongodbConnectionString);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  // filename: (req, file, cb) => {
  //   cb(null, `${Date.now()}-${file.originalname}`);
  // },
});

const upload = multer({ storage: storage });

const SongSchema = new mongoose.Schema({
  title: String,
  singer: String,
  imagePath: String,
  songPath: String,
});

const Song = mongoose.model("Song", SongSchema);

app.get("/api/topArtists", async (req, res) => {
  try {
    const response = await axios.get("https://api.deezer.com/genre/0/artists");
    const artistIds =
      response.data?.data?.map((artistData) => artistData.id) || [];
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
          error
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
    console.log("Error fetching artist data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/artists", async (req, res) => {
  try {
    const response = await axios.get("https://api.deezer.com/genre/2/artists");
    res.json(response.data?.data.slice(0, 10));
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/tracks", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:3001/api/topArtists");
    const artistsData = response.data?.map((artist, index) => artist.data[1]);

    const trackListPromises = artistsData.map(async (artist) => {
      try {
        const response2 = await axios.get(artist.artist.tracklist);
        return response2.data;
      } catch (error) {
        console.error(
          `Error fetching albums for artist ${artist.artist.name}:`,
          error
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
  upload.fields([{ name: "song" }, { name: "image" }]),
  async (req, res) => {
    const { title, singer } = req.body;
    const songFile = req.files?.song?.[0];
    const imageFile = req.files?.image?.[0];

    if (!songFile || !imageFile) {
      return res
        .status(400)
        .json({ message: "Song and image files are required" });
    }

    const newSong = new Song({
      title,
      singer,
      imagePath: imageFile.path,
      songPath: songFile.path,
    });

    try {
      await newSong.save();
      res.json({ message: "Song uploaded successfully!" });
    } catch (err) {
      console.error("Error saving song:", err);
      res.status(500).json({ message: "Error uploading song" });
    }
  }
);

app.get("/api/songs", async (req, res) => {
  try {
    const songs = await Song.find({});

    const myListSong = songs.map((song) => ({
      title: song.title,
      singer: song.singer,
      imagePath: song.imagePath,
      songPath: song.songPath,
    }));
    res.json(myListSong);
  } catch (error) {
    console.log(error);
  }
});

app.get("/uploads/:filename", (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.params.filename);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(err);
    }
  });
});

app.delete("/api/songs/:title", async (req, res) => {
  const songTitle = req.params.title;
  try {
    const deletedItem = await Song.deleteOne({ title: songTitle });

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    } else {
      res.status(200).json({ message: "Item deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(3001, function () {
  console.log("Server started on port 3001");
});
