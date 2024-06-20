const mongoose = require("mongoose");
const methods = require("./methods");
const statics = require("./statics");

const songSchema = new mongoose.Schema({
  title: String,
  singer: String,
  imageFileName: String,
  audioFileName: String,
});

// Add methods to schema
songSchema.method(methods);

// Add statics to schema
songSchema.static(statics);

module.exports = songSchema;