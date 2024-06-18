const mongoose = require("mongoose");
const SongSchema = require ("./songSchema")

const Song = mongoose.model("Song", SongSchema);
module.exports = Song;