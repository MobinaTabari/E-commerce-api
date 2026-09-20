import jwt from "jsonwebtoken";
import "dotenv/config";

export const createJwtToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};
