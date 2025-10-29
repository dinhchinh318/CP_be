const Result = require("../models/Result");
const Question = require("../models/Question");

exports.submitTest = async (req, res) => {
  try {
    const { userId, answers } = req.body;

    let score = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

    // Tính điểm
    for (const ans of answers) {
      const question = await Question.findById(ans.questionId);
      if (question) score[question.category] += ans.score;
    }

    // Convert sang % (giả sử mỗi category max = 50 điểm)
    const totalQuestions = answers.length / 6; // 6 categories
    const maxScore = totalQuestions * 5; // Giả sử mỗi câu max 5 điểm

    const scorePercent = {
      R: Math.round((score.R / maxScore) * 100),
      I: Math.round((score.I / maxScore) * 100),
      A: Math.round((score.A / maxScore) * 100),
      S: Math.round((score.S / maxScore) * 100),
      E: Math.round((score.E / maxScore) * 100),
      C: Math.round((score.C / maxScore) * 100)
    };

    const sorted = Object.keys(scorePercent).sort((a, b) => scorePercent[b] - scorePercent[a]);
    const riasecCode = sorted.slice(0, 3).join("");

    const result = await Result.create({
      userId,
      riasecCode,
      details: scorePercent,
    });

    res.json({ message: "Result saved!", result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getResultById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Result.findById(id);
    if (!result) return res.status(404).json({ message: "Result not found" });

    if (!result.details) result.details = {
      R: 0, I: 0, A: 0, S: 0, E: 0, C: 0
    };

    // Trả về trực tiếp result thôi
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



