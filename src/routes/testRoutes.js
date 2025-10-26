const express = require("express");
const { submitTest, getResultById} = require("../controllers/testController");

const router = express.Router();

router.post("/submit", submitTest);
router.get("/:id", getResultById);

module.exports = router;
