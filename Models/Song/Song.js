import mongoose from 'mongoose';
import songSchema from './songSchema.js'; // Path to your schema file

const Song = mongoose.model("Song", songSchema);

export default Song;