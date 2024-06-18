const mongoose = require("mongoose");
const SongSchema = require("./songSchema"); // Path to your schema file

const Song = mongoose.model("Song", SongSchema);

module.exports = Song;