const mongoose = require("mongoose");
const songSchema = require("./songSchema"); // Path to your schema file

const Song = mongoose.model("Song", songSchema);

module.exports = Song;