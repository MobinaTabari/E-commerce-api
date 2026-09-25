import { body } from "express-validator";

export const productUpdateValidator = [
    body("name")
        .optional()
        .isString()
        .withMessage("Name must be a string")
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 4, max: 15 })
        .withMessage("Name must be between 4 and 15 characters"),

    body("price")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Price must be a non-negative integer"),

    body("stock")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Stock must be a non-negative integer"),

    body("category_id")
        .optional()
        .isString()
        .withMessage("category_id must be a string")
        .isUUID()
        .withMessage("category_id must be a valid UUID"),
];