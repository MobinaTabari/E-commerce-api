import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
    destination : (req,file, cb) => {
        cb(null, "uploads/products")
    },

    filename: (req,file, cb) => {
        const extension = path.extname(file.originalname);
        const fileName = `${uuidv4()}${extension}`;
        cb(null, fileName);
    }
})

const upload = multer({
    storage,
    
    limits: {
        fileSize: 5 * 1024 * 1024
    },

    fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"));
    }
}
});

export { upload };