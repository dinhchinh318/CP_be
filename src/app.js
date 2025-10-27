// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();

// app.use(cors({
//   origin: [
//     'http://localhost:3000',
//     'http://localhost:5173',
//     process.env.FRONTEND_URL
//   ].filter(Boolean),
//   credentials: true
// }));
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Career Compass API is running!");
// });

// const authRoutes = require("./routes/authRoutes");
// app.use("/auth", authRoutes);

// const questionRoutes = require("./routes/questionRoutes");
// app.use("/questions", questionRoutes);

// const testRoutes = require("./routes/testRoutes");
// app.use("/test", testRoutes);

// const careerRoutes = require("./routes/careerRoutes");
// app.use("/careers", careerRoutes);

// const aiRoutes = require("./routes/aiRoutes.js");
// app.use("/api/ai", aiRoutes);

// module.exports = app;

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS configuration
// app.use(cors({
//   origin: function(origin, callback) {
//     const allowedOrigins = [
//       'http://localhost:3000',
//       'http://localhost:5173',
//       process.env.FRONTEND_URL
//     ].filter(Boolean);
    
//     // Cho phép requests không có origin (mobile apps, Postman, etc.)
//     if (!origin) return callback(null, true);
    
//     if (allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       console.log('Blocked by CORS:', origin);
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));


app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.get("/", (req, res) => {
  res.json({ 
    message: "Career Compass API is running!",
    timestamp: new Date().toISOString()
  });
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

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

module.exports = app;