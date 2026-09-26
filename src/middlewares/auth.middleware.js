import jwt from "jsonwebtoken";
import { CustomError } from "../utils/customError.util.js";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new CustomError("Authorization header is required", 401);
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        throw new CustomError("Token is required", 401);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        throw new CustomError("Invalid or expired token", 401);
    }
};