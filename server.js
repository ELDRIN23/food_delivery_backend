import express from "express";
import { connectDB } from "./config/db.js";
import { apiRouter } from "./routes/index.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import paymentRoute from "./paymentRouter/paymentRoute.js";
import morgan from "morgan";

// Load environment variables at the very beginning
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev")); // Enable logging

// CORS Configuration
app.use(
  cors({
    origin: [
      "https://food-delivery-frontend-woad.vercel.app","https://food-delivery-frontend-git-main-eldrin-johnsons-projects.vercel.app/",
      "http://localhost:5173","https://food-delivery-frontend-woad.vercel.app/" // Development frontend
    ],
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
    credentials: true,
  })
);

// API Routes
app.use("/api/payment", paymentRoute);
app.use("/api", apiRouter);

// Test Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the Server
const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

// Graceful Shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  // Add logic to properly close DB connection if needed
  process.exit(0);
});
