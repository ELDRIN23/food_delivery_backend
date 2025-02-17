import express from "express";
import { connectDB } from "./config/db.js";
import {apiRouter} from "./routes/index.js"; // Ensure this is exported correctly in your routes file
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from 'cors';
//import {apiRouter}from "./routes/userRoutes.js"
const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 3001; // Use environment variable or fallback to 3000

// cloudinaryInstance()
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  credentials: true
}));

// app.use('/uploads', express.static('uploads'));

// Connect to Database
connectDB();

// Route API
app.use("/api", apiRouter);


// Test Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the Server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
