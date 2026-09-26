import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import categoryRouter from "./routes/category.routes.js";
import productRouter from "./routes/product.routes.js";
import userRouter from "./routes/user.routes.js";
import favoriteRouter from "./routes/favorite.routes.js";
import { prisma } from "./utils/prisma.util.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRouter);

app.use("/api/auth", authRouter);

app.use("/api/categories",categoryRouter);

app.use("/api/products", productRouter);

app.use("/api/users", userRouter)

app.use("/api/favorites", favoriteRouter);

app.use(errorHandler)

app.listen(port, () => {
    console.log(`server is running on PORT ${port}`);
});

