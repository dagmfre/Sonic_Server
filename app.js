const mongoose = require("mongoose");
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
require("dotenv").config();

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

app.get("/api-artists", async (req, res) => {
  try {
    const response = await axios.get("https://api.deezer.com/genre/0/artists");
    const artistIds = response.data.data.map((artistData) => artistData.id);
    const firstTenArtistIds = artistIds.slice(0, 10);
    const artistTopSongs = firstTenArtistIds.map(async (artistId) => {
      const response2 = await axios.get(
        `https://api.deezer.com/artist/${artistId}/top?limit=1`
      );
      return response2.data; 
    }); 

    const resolvedArtistTopSongs = await Promise.all(artistTopSongs);
    res.json(resolvedArtistTopSongs);
  } catch (error) {
    console.log(error);
  }
});

// https://api.deezer.com/artist/%7BID%7D/top?limit=50
app.listen(3001, function () {
  console.log("Server started on port 3001");
});
