const express = require("express");
const {
  updateCourse,
  addMultipleCourse,
} = require("../controllers/courseController");
const {
  getStudents,
  getStudentById,
  addStudent,
  getStudentByfirstName,
  updateStudent,
  deleteStudent,
  getAllStudentCourses,
  addStudentCourse,
  searchById,
  deleteStudentCourse,
  addManyStudentCourse,
} = require("../controllers/studentController");
const router = express();

router.get("/getAllStudents", getStudents);
router.get("/getStudentById", getStudentById);
router.get("/getStudentByFirstName", getStudentByfirstName);
router.get("/searchById", searchById);
router.get("/getStudentCourses", getAllStudentCourses);
router.post("/addStudent", addStudent);
router.post("/addStudentCourse", addStudentCourse);
router.post("/addMultipleCourses", addManyStudentCourse);
router.put("/updateStudent", updateStudent);
router.put("/updateStudentCourse", updateCourse);
router.delete("/deleteStudent", deleteStudent);
router.delete("/deleteStudentCourse", deleteStudentCourse);
module.exports = router;
