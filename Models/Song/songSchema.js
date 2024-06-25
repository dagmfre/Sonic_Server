import mongoose from 'mongoose';
import methods from './methods.js';
import statics from './statics.js';

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

export default songSchema;