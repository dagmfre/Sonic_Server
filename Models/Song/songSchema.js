const mongoose = require("mongoose");
const methods = require("./methods");
const statics = require("./statics");

const SongSchema = new mongoose.Schema({
  title: String,
  singer: String,
  imageFileName: String,
  audioFileName: String,
});

//add method to schema
SongSchema.method(methods);

//add static to schema
SongSchema.static(statics);
export default SongSchema;