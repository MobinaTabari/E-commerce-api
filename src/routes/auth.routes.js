import { Router } from "express";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import { checkValidation } from "../middlewares/checkValidation.middleware.js";
import { login, register } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", registerValidator, checkValidation, register);

router.post("/login", loginValidator, checkValidation, login);

export default router;
