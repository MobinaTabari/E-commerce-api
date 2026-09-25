import { Router } from "express";
import { productValidator } from "../validators/product.validator.js";
import { checkValidation } from "../middlewares/checkValidation.middleware.js";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/product.controller.js";
import { productUpdateValidator } from "../validators/productUpdate.validator.js";

const router = Router();

router.post("/", productValidator, checkValidation, createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", productUpdateValidator, checkValidation, updateProduct);
router.delete("/:id", deleteProduct)

export default router;