import jwt from "jsonwebtoken";
import userModel from "../Models/Users/userModel.js";

const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization denied" });
  }

  try {
    const token = authHeader.split(" ")[1]; // Get token from Bearer token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await userModel.findById({ _id: decoded.id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    next({
      error,
      status: 401,
      message:
        "Could not retrieve user: " + error.message,
    });
  }
};

export default isAuthenticated;
