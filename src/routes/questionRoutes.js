const express = require("express");
const { createQuestion, getQuestions, deleteQuestion } = require("../controllers/questionController");
const { authRequired, adminOnly } = require("../middleware/auth");


const router = express.Router();

router.post("/", authRequired, adminOnly, createQuestion);
router.get("/", getQuestions);
router.delete("/:id", deleteQuestion);


module.exports = router;
