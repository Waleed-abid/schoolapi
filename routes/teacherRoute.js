const express = require("express");
const {
  getTeachers,
  getTeacherById,
  addTeacher,
} = require("../controllers/teacherController");

const router = express();

router.get("/getAllTeachers", getTeachers);
router.get("/getTeacherById", getTeacherById);
router.post("/addTeacher", addTeacher);

module.exports = router;
