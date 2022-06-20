const express = require("express");
const {
  getStudents,
  getStudentById,
  addStudent,
} = require("../controllers/studentController");
const router = express();

router.get("/getAllStudents", getStudents);
router.get("/getStudentById", getStudentById);
router.post("/addStudent", addStudent);

module.exports = router;
