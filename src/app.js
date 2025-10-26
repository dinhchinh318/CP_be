const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Read allowed frontend origin(s) from .env (comma-separated)
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
const allowedOrigins = FRONTEND_URL.split(",").map((s) => s.trim());

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // Reject other origins
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true, // Allow cookies and authentication headers
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type", 
    "Authorization",
    "X-Requested-With",
    "Accept"
  ],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  maxAge: 86400, // Cache preflight request for 24 hours
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" })); // Limit request body size
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.get("/", (req, res) => {
  res.send("Career Compass API is running!");
});

// Health check endpoint for database
app.get("/health", async (req, res) => {
  try {
    // Add your database connection check here
    // const dbCheck = await db.ping() or similar
    res.status(200).json({ 
      status: "ok", 
      message: "API and Database are running",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({ 
      status: "error", 
      message: "Database connection failed",
      error: error.message 
    });
  }
});

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const questionRoutes = require("./routes/questionRoutes");
app.use("/questions", questionRoutes);

const testRoutes = require("./routes/testRoutes");
app.use("/test", testRoutes);

const careerRoutes = require("./routes/careerRoutes");
app.use("/careers", careerRoutes);

const aiRoutes = require("./routes/aiRoutes.js");
app.use("/api/ai", aiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ 
      error: "CORS policy violation",
      message: "Origin not allowed" 
    });
  }
  
  console.error(err.stack);
  res.status(500).json({ 
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? err.message : "Something went wrong"
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: "Not found",
    message: "The requested endpoint does not exist" 
  });
});

module.exports = app;