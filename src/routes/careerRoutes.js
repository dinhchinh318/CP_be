// const express = require("express");
// const { createCareer, getCareersByCode } =
//   require("../controllers/careerController");

// const router = express.Router();

// router.post("/", createCareer); // Admin
// router.get("/:code", getCareersByCode); // User

// module.exports = router;

const express = require("express");
const { createCareer, getCareersByCode } = require("../controllers/careerController");
const { authRequired, adminOnly } = require("../middleware/auth");

const router = express.Router();

router.post("/", authRequired, adminOnly, createCareer);
router.get("/:code", getCareersByCode);

module.exports = router;
