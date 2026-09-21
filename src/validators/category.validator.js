import { body } from "express-validator";

export const categoryValidator = [
    body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name is required")
]