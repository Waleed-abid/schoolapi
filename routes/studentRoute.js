const express = require("express");
const {
  getStudents,
  getStudentById,
} = require("../controllers/studentController");
const router = express();

router.get("/getAllStudents", getStudents);
router.get("/getStudentById", getStudentById);

module.exports = router;
