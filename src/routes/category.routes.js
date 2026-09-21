import { Router } from "express";
import { checkValidation } from "../middlewares/checkValidation.middleware.js";
import { categoryValidator } from "../validators/category.validator.js";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../controllers/category.controller.js";

const router = Router();

router.post("/", categoryValidator, checkValidation, createCategory)
router.get("/", categoryValidator, checkValidation, getCategories)
router.put("/:id", updateCategory)
router.delete("/:id", deleteCategory)

export default router;