const express = require("express");
const { getStudents } = require("../controllers/studentController");
const router = express();

router.get("/getAllStudents", getStudents)

module.exports = router