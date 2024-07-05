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
userSchema.methods.saveRegisteredUser = async function () {
  return await this.save();
};

// Add statics to schema
userSchema.statics.findUserByEmail = async function (email) {
  return await this.findOne({ email });
};

export default userSchema;
