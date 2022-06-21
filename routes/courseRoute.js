const express = require("express");
const {
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
  addMultipleCourse,
} = require("../controllers/courseController");
const router = express();

router.get("/getAllCourses", getAllCourses);
router.get("/searchById", getCourseById);
router.post("/addCourse", addCourse);
router.post("/addMultipleCourses", addMultipleCourse);
router.put("/updateCourse", updateCourse);
router.delete("/deleteCourse", deleteCourse);

module.exports = router;
