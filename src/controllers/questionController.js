const Question = require("../models/Question");

exports.createQuestion = async (req, res) => {
  try {
    const { content, category } = req.body;
    const question = await Question.create({ content, category });
    res.json({ message: "Question created!", question });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedQuestion = await Question.findByIdAndDelete(id);

    if (!deletedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.json({ message: "Question deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

