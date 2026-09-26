import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const createStorage = (folder) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, folder);
        },

        filename: (req, file, cb) => {
            const extension = path.extname(file.originalname);
            const fileName = `${uuidv4()}${extension}`;

            cb(null, fileName);
        }
    });
};

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"));
    }
};

const createUpload = (folder) => {
    return multer({
        storage: createStorage(folder),

        limits: {
            fileSize: 5 * 1024 * 1024
        },

        fileFilter
    });
};

const upload = createUpload("uploads/products");
const userUpload = createUpload("uploads/users");

export { upload, userUpload };