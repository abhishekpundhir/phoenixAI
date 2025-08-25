import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

dotenv.config();

const app = express();

// Configure CORS: if FRONTEND_URL is set, only allow it; otherwise accept any origin (dev-friendly).
const FRONTEND_URL = process.env.FRONTEND_URL;
const corsOptions = {};
if (FRONTEND_URL) {
  corsOptions.origin = FRONTEND_URL;
} else {
  // `true` tells cors to reflect request origin — handy for dev/testing.
  corsOptions.origin = true;
}
app.use(cors(corsOptions));
app.use(express.json());

// API routes
app.use("/api", chatRoutes);

// Simple health check (useful in Render logs / probes)
app.get("/healthz", (req, res) => res.json({ status: "ok" }));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected to Phoenix Database");
  } catch (err) {
    console.error("Connection failed with Phoenix Database! Error:", err);
    // fatal: exit so Render will mark deploy unhealthy
    process.exit(1);
  }
};

connectDB();

// IMPORTANT: listen to process.env.PORT and bind to 0.0.0.0
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Phoenix server running on port ${PORT}`);
});

export default app;
