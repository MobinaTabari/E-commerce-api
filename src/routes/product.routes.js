import { Router } from "express";
import { productValidator } from "../validators/product.validator.js";
import { checkValidation } from "../middlewares/checkValidation.middleware.js";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/product.controller.js";
import { productUpdateValidator } from "../validators/productUpdate.validator.js";
import { upload } from "../utils/multer.util.js";

const router = Router();

router.post("/", upload.array("images", 5), productValidator, checkValidation, createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", productUpdateValidator, checkValidation, updateProduct);
router.delete("/:id", deleteProduct)

export default router;