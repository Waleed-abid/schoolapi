const express = require("express");
const {
  getTeachers,
  getTeacherById,
  addTeacher,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teacherController");

const router = express();

router.get("/getAllTeachers", getTeachers);
router.get("/getTeacherById", getTeacherById);
router.post("/addTeacher", addTeacher);
router.put("/updateTeacher", updateTeacher);
router.delete("/deleteTeacher", deleteTeacher);

module.exports = router;
