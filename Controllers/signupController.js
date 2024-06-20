const User = require("../Models/Users/userModel");
const { createSecretToken } = require("../Utils/secretToken");

const signupController = async (req, res, next) => {
  const { email, password, username } = req.body;
  const newUser = new User({
    email,
    password,
    username,
  });

  try {
    const existingUser = await User.findSongByEmail({ email });
    console.log(email, req.body);
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await newUser.saveRegisteredUser({
      email,
      password,
      username,
    });
    const token = createSecretToken(user._id);
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
      error: "Error registering user",
    });
  }
};

module.exports = signupController;
