const mongoose = require("mongoose");
const methods = require("./methods");
const statics = require("./statics");

const SongSchema = new mongoose.Schema({
  title: String,
  singer: String,
  imageFileName: String,
  audioFileName: String,
});

// Add methods to schema
SongSchema.method(methods);

// Add statics to schema
SongSchema.static(statics);

module.exports = SongSchema;