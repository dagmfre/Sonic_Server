import jwt from "jsonwebtoken";
import userModel from "../Models/Users/userModel.js";
const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;

  console.log(req.cookies);
  
  if (!token) {
    return res.status(401).json({ message: "Authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await userModel.findById({ _id: decoded.id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    error,
      next({
        error,
        status: 401,
        error:
          "Internal server error, could not retrieve user" +
          " " +
          error.message,
      });
  }
};

export default isAuthenticated;
