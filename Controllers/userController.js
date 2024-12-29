import User from "../Models/Users/userModel.js";

const getUserController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next({
      error,
      status: 500,
      message: "Error fetching user data: " + error.message,
    });
  }
};

export default getUserController;
