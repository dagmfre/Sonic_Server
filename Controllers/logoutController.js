const logout = async (req, res, next) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next({
      status: 500,
      error: "Error logging out user" + error,
    });
  }
};

module.exports = logout;
