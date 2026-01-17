import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import studentRoutes from "./routes/studentRoutes.js"

dotenv.config();
connectDB();

const app = express();

app.use(
    cors()
);

app.use(express.json());

app.use("/api/student", studentRoutes);


app.listen(process.env.PORT, () =>
    console.log("Serevr Runing ....")
);