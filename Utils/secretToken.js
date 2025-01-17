import dotenv from "dotenv";

dotenv.config();
import jwt from "jsonwebtoken";

const createSecretToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.SECRET_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

export default createSecretToken;
