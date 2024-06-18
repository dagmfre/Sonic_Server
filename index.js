const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));

const artistRoutes = require("./Routes/artistRoutes");
const topArtists = require("./Routes/topArtists");
const songRoutes = require("./Routes/songRoutes");
const fileRoutes = require("./Routes/fileRoutes");

app.use("/api/artists", artistRoutes);
app.use("/api/topArtists", topArtists);
app.use("/api/songs", songRoutes);
app.use("/file", fileRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});