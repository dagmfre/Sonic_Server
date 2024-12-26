import mongoose from "mongoose";
import methods from "./methods.js";
import statics from "./statics.js";

const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  // Array of song IDs uploaded by current authorized user
  uploadedSongs: [
    {
      title: String,
      singer: String,
      imageFileName: String,
      audioFileName: String,
    },
  ],
});

// Add methods to schema
userSchema.method(methods);

// Add statics to schema
userSchema.static(statics);

export default userSchema;
