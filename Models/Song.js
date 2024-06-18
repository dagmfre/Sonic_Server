const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  title: String,
  singer: String,
  imageFileName: String,
  audioFileName: String,
});

// custom static method for uploading song data
SongSchema.statics.uploadSong = async function (
  title,
  singer,
  imageFileName,
  audioFileName
) {
  try {
    const newSong = new this({
      title,
      singer,
      imageFileName,
      audioFileName,
    });
    await newSong.save();
    console.log("Song Saved Successfully");
    return newSong;
  } catch (err) {
    console.error("Error saving song:", err);
    throw new Error("Error uploading song");
  }
};

// custom static method for finding songs by audio fine name
SongSchema.statics.getSongByAudioFileName = async function (audioFileName) {
  try {
    const song = await this.findOne({ audioFileName });
    if (!song) {
      throw new Error("Song not found");
    }
    return song;
  } catch (err) {
    console.error("Error getting song:", err);
    throw err;
  }
};

// custom static method for deleting songs metadata by audio fine name
SongSchema.statics.deleteSongByAudioFileName = async function (audioFileName) {
  try {
    const result = await this.deleteOne({ audioFileName });
    if (result.deletedCount === 0) {
      throw new Error("Song not found");
    }
    console.log(`Song '${audioFileName}' deleted successfully`);
  } catch (err) {
    console.error("Error deleting song:", err);
    throw err;
  }
};

const Song = mongoose.model("Song", SongSchema);

module.exports = Song;
