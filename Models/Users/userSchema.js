const mongoose = require("mongoose");
const methods = require("./methods");
const statics = require("./statics");

const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  // Array of song IDs uploaded by current authorized user
  uploadedSongs: [
    {
      title: String,
      singer: String,
    },
  ],
});

// Add methods to schema
userSchema.method(methods);

// Add statics to schema
userSchema.static(statics);

module.exports = userSchema;
