import { body } from "express-validator";

export const registerValidator = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("email")
    .isString()
    .withMessage("Email must be a string")
    .isEmail()
    .withMessage("Email must be a valid email address"),

  body("password")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

export const loginValidator = [
    body("email")
    .isString()
    .withMessage("Email must be a string")
    .isEmail()
    .withMessage("Email must be a valid email address"),

  body("password")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
]
