import User from "../Models/Users/userModel.js";
import bcrypt from "bcrypt";
import createSecretToken from "../Utils/secretToken.js";

const signupController = async (req, res, next) => {
  const { email, password, username } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = new User({
    email,
    password: hashedPassword,
    username,
  });

  try {
    const existingUser = await User.findUserByEmail(email);
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await newUser.save();
    const role = "user";
    const token = createSecretToken(user._id, role);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Required for HTTPS
      sameSite: "none", // Required for cross-origin
      maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
      path: "/",
      domain: ".onrender.com", // Adjust this to match your domain
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
  } catch (error) {
    next({ error, status: 500, error: "Error registering user" + error });
  }
};

export default signupController;
