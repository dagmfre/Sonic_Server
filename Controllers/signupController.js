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
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
  } catch (error) {
    next({ error, status: 500, error: "Error registering user" + error });
  }
};

export default signupController;
