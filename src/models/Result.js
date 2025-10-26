const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  riasecCode: { type: String, required: true }, // ví dụ: "RIA"
  details: {
    R: Number,
    I: Number,
    A: Number,
    S: Number,
    E: Number,
    C: Number,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Result", resultSchema);
