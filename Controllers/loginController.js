import User from "../Models/Users/userModel.js";
import createSecretToken from "../Utils/secretToken.js";
import bcrypt from "bcrypt";

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findUserByEmail(email);
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const role = "user";
    const token = createSecretToken(user._id, role);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true, user });
  } catch (error) {
    next({
      error,
      status: 500,
      error: "Error logging in user" + error.message,
    });
  }
};

export default loginController;