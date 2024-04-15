const mongoose = require("mongoose");
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
require("dotenv").config();

// connecting to mongodb server
const mongodbConnectionString = process.env.MONGODB_URI;

main().catch((err) => console.log(err));
async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/musicAppTest");
    //   await mongoose.connect(mongodbConnectionString);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors());

app.listen(3001, function () {
  console.log("Server started on port 3001");
});
