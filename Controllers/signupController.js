const User = require("../Models/Users/userModel");
const bcrypt = require("bcrypt");
const { createSecretToken } = require("../Utils/secretToken");

const signupController = async (req, res, next) => {
  const { email, password, username } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = new User({
    email,
    password: hashedPassword,
    username,
  });

  try {
    const existingUser = await User.findSongByEmail({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await newUser.save();
    const role = "user";
    const token = createSecretToken(user._id, role);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.log(error);
    next({
      status: 500,
      error: "Error registering user" + error,
    });
  }
};

module.exports = signupController;
