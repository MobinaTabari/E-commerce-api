import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import { prisma } from "./utils/prisma.util.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(express.json());

app.use("/api/auth", authRouter);

app.use("/api/auth", authRouter);

app.use(errorHandler)

app.listen(port, () => {
    console.log(`server is running on PORT ${port}`);
});

