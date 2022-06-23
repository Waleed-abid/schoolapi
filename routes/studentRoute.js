const express = require("express");
const {
  getStudents,
  getStudentById,
  addStudent,
  getStudentByfirstName,
  updateStudent,
  deleteStudent,
  getAllStudentCourses,
  addStudentCourse,
} = require("../controllers/studentController");
const router = express();

router.get("/getAllStudents", getStudents);
router.get("/getStudentById", getStudentById);
router.get("/getStudentByFirstName", getStudentByfirstName);
router.get("/getStudentCourses", getAllStudentCourses);
router.post("/addStudent", addStudent);
router.post("/addStudentCourse", addStudentCourse);
router.put("/updateStudent", updateStudent);
router.delete("/deleteStudent", deleteStudent);
module.exports = router;
