const express = require("express");
const {
  getStudents,
  getStudentById,
  addStudent,
  getStudentByfirstName,
} = require("../controllers/studentController");
const router = express();

router.get("/getAllStudents", getStudents);
router.get("/getStudentById", getStudentById);
router.get("/getStudentByFirstName", getStudentByfirstName);
router.post("/addStudent", addStudent);

module.exports = router;
