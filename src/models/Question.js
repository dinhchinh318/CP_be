const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  content: { type: String, required: true },
  category: {
    type: String,
    enum: ["R", "I", "A", "S", "E", "C"],
    required: true,
  },
});

module.exports = mongoose.model("Question", questionSchema);
