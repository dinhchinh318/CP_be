// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();

// app.use(cors());
// app.use(express.json());
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Cấu hình CORS đúng cách
const corsOptions = {
  origin: function (origin, callback) {
    // Danh sách domain được phép
    const allowedOrigins = [
      process.env.FRONTEND_URL, // URL frontend của bạn
      'http://localhost:3000',  // Development local
      'http://localhost:5173',  // Vite development
    ].filter(Boolean); // Loại bỏ undefined values

    // Cho phép requests không có origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Cho phép gửi cookies
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// ... rest of your code

app.get("/", (req, res) => {
  res.send("Career Compass API is running!");
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

module.exports = app;
