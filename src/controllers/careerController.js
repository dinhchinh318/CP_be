const Career = require("../models/Career");

exports.createCareer = async (req, res) => {
  try {
    const { name, code, description, skills } = req.body;
    const career = await Career.create({ name, code, description, skills });
    res.json({ message: "Career created!", career });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCareersByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const careers = await Career.find({ code });
    res.json(careers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
