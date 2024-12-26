import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongodbConnectionString = process.env.MONGODB_URI;

mongoose.connect(mongodbConnectionString);

const conn = mongoose.connection;
conn.once("open", () => {
  console.log("Connected to MongoDB");
});

export default conn;
