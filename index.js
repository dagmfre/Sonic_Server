const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const artistRoutes = require("./Routes/artistRoutes");
const topArtists = require("./Routes/topArtists");
const songRoutes = require("./Routes/songRoutes");
const fileRoutes = require("./Routes/fileRoutes");
const tracksRoute = require("./Routes/tracksRoute");

app.use("/api/artists", artistRoutes);
app.use("/api/topArtists", topArtists);
app.use("/api/songs", songRoutes);
app.use("/api/tracks", tracksRoute);
app.use("/file", fileRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});