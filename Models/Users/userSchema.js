const mongoose = require("mongoose");
const methods = require("./methods");
const statics = require("./statics");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  // Array of song IDs uploaded by current authorized user
  uploadedSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
});

// Add methods to schema
userSchema.method(methods);

// Add statics to schema
userSchema.static(statics);

module.exports = userSchema;