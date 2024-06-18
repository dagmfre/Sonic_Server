const mongoose = require("mongoose");
require("dotenv").config();

const mongodbConnectionString = process.env.MONGODB_URI;

mongoose.connect(mongodbConnectionString);

const conn = mongoose.connection;
conn.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = conn;