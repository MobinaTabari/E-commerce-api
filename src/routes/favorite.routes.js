import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { addFavorite, getFavorites, removeFavorite } from "../controllers/favorite.controller.js";

const router = Router();

router.post("/", authMiddleware, addFavorite);
router.get("/", authMiddleware, getFavorites);
router.delete("/",authMiddleware, removeFavorite);



export default router;