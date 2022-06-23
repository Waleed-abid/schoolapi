const { Courses } = require("../models");
const _ = require("lodash");
const { db } = require("../config");

const getAllCourses = async (req, res) => {
  try {
    let courses = await Courses.get();
    courses = courses.docs?.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    res.status(200).send(courses);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.query;
    if (!courseId)
      return res.status(400).send({ message: "Please Enter a course Id" });
    let course = await Courses.doc(courseId).get();
    if (course.exists) return res.status(200).send({ course: course.data() });
    res.status(404).send({ message: "Course not found" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const addCourse = async (req, res) => {
  const { Course } = req.body;
  try {
    if (!Course)
      return res.status(404).send({ message: "Please Enter Course Details" });
    if (!Course.courseId)
      return res.status(404).send({ message: "Please Enter Course Details" });
    if (Object.keys(Course).length === 0)
      return res.status(404).send({ message: "Please Enter Course Details" });
    const course = await Courses.doc(Course.courseId).get();
    if (course.exists)
      return res.status(200).send({ message: "Course already exists" });
    await Courses.doc(Course.courseId).set(Course);
    res.status(200).send({ message: "Course added successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const addMultipleCourse = async (req, res) => {
  const { courses } = req.body;
  try {
    let batch = db.batch();
    courses?.filter((course) => {
      batch.set(Courses.doc(`${course?.courseId}`), {
        courseName: course?.courseName ?? "",
        courseTeacher: course?.courseTeacher ?? "",
        courseAssistantTeacher: course?.courseAssistantTeacher ?? "",
        courseId: course?.courseId ?? "",
      });
    });
    await batch.commit();

    res.status(201).send({ message: "Courses added successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { courseId } = req.query;
    const { course } = req.body;
    if (!courseId)
      return res.status(404).send({ message: "Please Enter Course Id" });
    let courseRef = await Courses.doc(courseId).get();
    if (courseRef.exists) {
      const newCourse = {
        courseName: course?.courseName ?? "",
        courseId: courseId,
        courseTeacher: course?.courseTeacher ?? "",
        courseAssistantTeacher: course?.courseAssistantTeacher ?? "",
      };
      await Courses.doc(courseId).update(newCourse);
      return res.status(200).send({ message: "Course updated successfully." });
    }
    res.status(404).send({ message: "Course with the given id not found" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteCourse = async (req, res) => {
  const { courseId } = req.query;
  try {
    if (!courseId) {
      return res.status(404).send({ message: "Please enter a course Id" });
    }
    const course = await Courses.doc(courseId).get();
    if (course.exists) {
      await Courses.doc(courseId).delete();
      return res.status(200).send({ message: "Course deleted successfully" });
    }
    res.status(404).send({ message: "Course with the given id not found" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  addCourse,
  addMultipleCourse,
  updateCourse,
  deleteCourse,
};
