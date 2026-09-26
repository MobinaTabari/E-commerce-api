import {body} from "express-validator";

export const productValidator = [
    body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 4, max: 15 })
    .withMessage("Name must be between 4 and 15 characters"),

    body("price")
    .isInt({min : 0})
    .withMessage("Price must be a non-negative integer")
    .notEmpty()
    .withMessage("Price is required"),

    body("stock")
    .isInt({min : 0})
    .withMessage("Stock must be a non-negative integer")
    .notEmpty()
    .withMessage("Stock is required"),

    body("category_id")
    .isString()
    .withMessage("category_id must be a string")
    .notEmpty()
    .withMessage("category_id is required")
    .isUUID()
    .withMessage("category_id must be a valid UUID"),

]