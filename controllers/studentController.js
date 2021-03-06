const { db } = require("../config");
const { Students, StudentCourses } = require("../models");

const getStudents = async (req, res) => {
  try {
    let students = [];
    let studentsRef = await Students.get();
    for (const doc of studentsRef.docs) {
      students.push({ id: doc.id, ...doc.data() });
    }
    res.status(200).send({ students });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getStudentById = async (req, res) => {
  const { studentId } = req.query;
  try {
    if (!studentId) {
      return res.status(400).send({ message: "Student id cannot be empty" });
    }
    let student = await Students.doc(studentId).get();
    if (student.exists) {
      return res.status(200).send({ student: student.data() });
    }
    res.status(404).send({ message: "Student with the given id not found" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getStudentByfirstName = async (req, res) => {
  try {
    const { firstName } = req.body;
    let students = await Students.where("firstName", "==", firstName).get();
    students = students.docs?.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    res.status(200).send(students);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const addStudent = async (req, res) => {
  const { Student } = req.body;
  try {
    if (!Student) {
      return res.status(404).send({ message: "Please Enter Student Details" });
    }
    const newStudent = {
      firstName: Student?.firstName ?? "",
      lastName: Student?.lastName ?? "",
      age: Student?.age ?? "",
      email: Student?.email ?? "",
      dob: Student?.dob ?? "", //date of birth
      doe: Student?.doe ?? "", // date of Enrollement
      session: Student?.session ?? "", //enrollment session
    };
    await Students.add(newStudent);
    res.status(201).send({ message: "Student added successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateStudent = async (req, res) => {
  const { studentId } = req.query;
  const { Student } = req.body;
  try {
    let student = await Student.doc(studentId).get();
    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }
    await Student.update(student);
    res.status(200).send({ message: "Student updated successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteStudent = async (req, res) => {
  const { studentId } = req.query;
  const student = await Students.doc(studentId).get();
  if (student.exists) {
    await Students.doc(student.id).delete();
    return res.status(200).send({ message: "Student deleted successfully" });
  }
  res.status(404).send({ message: "Student not found" });
};

// Student courses routes

const getAllStudentCourses = async (req, res) => {
  const { studentId } = req.query;
  try {
    let courses = [];
    if (!studentId) {
      return res.status(404).send({ message: "Student id cannot be empty" });
    }
    const studentCourses = await StudentCourses(studentId).get();
    for (const doc of studentCourses.docs) {
      courses.push({ id: doc.id, ...doc.data() });
    }
    res.status(200).send({ StudentCourses: courses });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const addStudentCourse = async (req, res) => {
  const { studentId } = req.query;
  const { Course } = req.body;
  try {
    await StudentCourses(studentId).doc(Course.courseId).set(Course);
    res.status(200).send({ message: "Course added successfully!" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const addManyStudentCourse = async (req, res) => {
  const { studentId } = req.query;
  const { courses } = req.body;
  try {
    courses.forEach((course) => {
      let newCourse = {
        courseName: course?.courseName ?? "",
        courseId: course?.courseId ?? "",
        courseTeacher: course?.courseTeacher ?? "",
        coureseAssistantTeacher: course?.coureseAssistantTeacher ?? "",
      };
      StudentCourses(studentId).doc(`${course.courseId}`).set(newCourse);
    });
    res.status(201).send({ message: "Courses successfully added to students" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const searchById = async (req, res) => {
  const { studentId, courseId } = req.query;
  try {
    let course = await StudentCourses(studentId)
      .where("courseId", "==", courseId)
      .get();
    course = course.docs?.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    res.status(200).send({ course: course });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateCourse = async (req, res) => {
  const { studentId, courseId } = req.query;
  const { course } = req.body;
  try {
    if (!studentId && !courseId) {
      return res
        .status(404)
        .send({ message: "Student Id and course Id cannot be empty" });
    }
    if (!course) {
      return res.status(404).send({ message: "Course Cannot be empty" });
    }
    if (Object.keys(course).length == 0) {
      return res.status(404).send({ message: "Course Cannot be empty" });
    }
    const courseRef = await StudentCourses(studentId).doc(courseId).get();
    if (courseRef.exists) {
      await StudentCourses(studentId).doc(courseId).update(course);
      return res.status(200).send({ message: "Course Updated successfully" });
    }
    res.status(404).send({ message: "Course Not Found" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteStudentCourse = async (req, res) => {
  const { studentId, courseId } = req.query;
  try {
    const courseRef = await StudentCourses(studentId).doc(courseId).get();
    if (courseRef.exists) {
      await StudentCourses(studentId).doc(courseId).delete();
      return res.status(200).send({ message: "Course deleted successfully" });
    }
    res.status(404).send({ message: "Course Not Found" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getStudents,
  getStudentById,
  getStudentByfirstName,
  addStudent,
  updateStudent,
  deleteStudent,
  getAllStudentCourses,
  addStudentCourse,
  searchById,
  updateCourse,
  deleteStudentCourse,
  addManyStudentCourse,
};
