const ac = require("./roles");
const jwt = require("jsonwebtoken");

const accessControl = (resource, action) => (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const permission = ac.can(decoded.role)[action](resource);

    if (permission.granted) {
      next();
    } else {
      next({
        status: 403,
        error: "Action Denied",
      });
    }
  } catch (error) {
    next({
      status: 401,
      error: "Unauthorized access",
    });
  }
};
module.exports = accessControl;
