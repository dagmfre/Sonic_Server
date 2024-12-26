import ac from "./roles.js";
import jwt from "jsonwebtoken";

const accessControl = (resource, action, isOwner) => async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const isOwnerValue = await isOwner(req.params.filename, req.user);
    if (!isOwnerValue) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const permission = ac.can(decoded.role)[action](resource);
    if (permission.granted) {
      next();
    } else {
      res.status(403).json({ error: "Forbidden" });
    }
  } catch (error) {
    const err = new Error("Unauthorized access: " + error.message);
    err.status = 401;
    next(err);
  }
};

export default accessControl;
