// import express from "express";
// import { askAI } from "../controllers/aiController.js";

// const router = express.Router();

// router.post("/", askAI);

// export default router;
// routes/aiRoutes.js
const express = require("express");
const { askAI } = require("../controllers/aiController");

const router = express.Router();

router.post("/", askAI);

module.exports = router;

