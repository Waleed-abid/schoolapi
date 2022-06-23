const { db } = require("../config");

const Students = db.collection("students");
const StudentCourses = (studentId) =>
  db.collection(`students/${studentId}/courses`);
const Courses = db.collection("courses");
const Teacher = db.collection("teachers");

module.exports = {
  Students,
  StudentCourses,
  Courses,
  Teacher,
};
