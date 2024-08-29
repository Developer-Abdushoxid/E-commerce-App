import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import router from "./routes/index.js";

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser())

app.use("/api",router)

const PORT = process.env.PORT || 8080;
connectDB().then(() =>{
    app.listen(PORT,()=>{
        console.log("connect to DB")
        console.log("Server is running")
    })
})

