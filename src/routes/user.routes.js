import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { userUpload } from "../utils/multer.util.js";
import { deleteUserImage, getUserImages, uploadUserImages } from "../controllers/user.controller.js";

const router = Router();

router.post("/images", authMiddleware, userUpload.array("images", 5), uploadUserImages);
router.get("/images", authMiddleware, getUserImages);
router.delete("/images/:imageId", authMiddleware, deleteUserImage)

export default router;