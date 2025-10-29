const express = require("express");
const { checkData, getAll, getAllUsers, getAllUsersV2, rawCheck} = require("../controllers/resultController");

const router = express.Router();

router.get("/check", checkData);
router.get("/all", getAll);
router.get("/all-users", getAllUsers);
router.get("/all-users-v2", getAllUsersV2);
router.get("/raw-check", rawCheck);


module.exports = router;