const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true }, // R / I / A / ... hoặc RIA
  description: String,
  skills: [String],
});

module.exports = mongoose.model("Career", careerSchema);
