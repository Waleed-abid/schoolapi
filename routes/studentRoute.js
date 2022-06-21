const express = require("express");
const {
  getStudents,
  getStudentById,
  addStudent,
  getStudentByfirstName,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");
const router = express();

router.get("/getAllStudents", getStudents);
router.get("/getStudentById", getStudentById);
router.get("/getStudentByFirstName", getStudentByfirstName);
router.post("/addStudent", addStudent);
router.put("/updateStudent", updateStudent);
router.delete("/deleteStudent", deleteStudent);
module.exports = router;
