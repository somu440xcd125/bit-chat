import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"
import cors from "cors"
import { app,server, } from "./lib/socet.js";
import path from "path"




dotenv.config(); // Ensure dotenv loads before using process.env


const PORT = process.env.PORT || 5000;
const __dirname=path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", // Corrected the URL
    credentials: true,
}));

// Route middleware
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "..", "..", "frontend", "dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "..", "..", "frontend", "dist", "index.html"));
    });
}


// Connect to DB before starting server
connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error("DB Connection Failed:", err);
});
