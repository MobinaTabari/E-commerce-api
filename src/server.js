import express from "express";
import dotenv from "dotenv";
import { prisma } from "./utils/prisma.util.js";

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(express.json());

app.get("/api/test", (req, res) => {
    res.send("API is working");
});

app.post("/api/test", (req,res) => {
    res.send(req.body);
});

app.listen(port, () => {
    console.log(`server is running on PORT ${port}`);
});

