import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(express.json());

// ✅ only allow your frontend origin if needed
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);

// ✅ API routes
app.use("/api", chatRoutes);

// ✅ serve frontend build
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDist = path.join(__dirname, "../frontend/dist");

app.use(express.static(clientDist));
app.get("*", (req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

// ✅ Mongo connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Successfully Connected to Phoenix Database.....");
  } catch (err) {
    console.log(`❌ Connection failed with Phoenix Database! Error: ${err}`);
  }
};
connectDB();

// ✅ Render needs PORT from env
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Phoenix server running on :${PORT}`);
});
