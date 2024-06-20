const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = require("./userSchema");

// Hash the password before saving the user model
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
