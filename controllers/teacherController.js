const { Teacher, Courses } = require("../models");

const getTeachers = async (req, res) => {
  try {
    let teachers = [];
    let teacherRef = await Teacher.get();
    for (const doc of teacherRef.docs) {
      teachers.push({ id: doc.id, ...doc.data() });
    }
    res.status(200).send({ teachers });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getTeacherById = async (req, res) => {
  const { teacherId } = req.query;
  try {
    let teacher = await Teacher.doc(teacherId).get();
    if (teacher.exists) {
      return res.status(200).send(teacher.data());
    }
    res.status(404).send({ error: "Teacher not found" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const addTeacher = async (req, res) => {
  const { teacher } = req.body;
  try {
    if (!teacher?.teacherId) {
      return res.status(404).send({ error: "Please enter Teacher id" });
    }
    const teacherRef = await Teacher.doc(teacher.teacherId).get();
    const courseRef = await Courses.doc(teacher.coursesTeach.courseId).get();
    if (teacherRef.exists) {
      return res.status(400).send({ error: "Teacher already exists" });
    }
    if (!courseRef.exists) {
      return res.status(400).send({ error: "Course Does Not Exist" });
    }
    const newTeacher = {
      firstName: teacher?.firstName ?? "",
      lastName: teacher?.lastName ?? "",
      age: teacher?.age ?? "",
      teacherId: teacher?.teacherId ?? "",
      education: teacher?.education ?? "",
      coursesTeach: {
        courseName: teacher?.coursesTeach?.courseName ?? "",
        courseId: teacher?.coursesTeach?.courseId ?? "",
      },
    };

    await Teacher.doc(teacher.teacherId).set(newTeacher);
    res.status(201).send({ message: "Teacher Created successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateTeacher = async (req, res) => {
  const { teacherId } = req.query;
  const { teacher } = req.body;
  try {
    if (!teacherId) {
      return res.status(404).send({ message: "Teacher id cannot be empty" });
    }
    const teacherRef = await Teacher.doc(teacherId).get();
    if (teacherRef.exists) {
      const coursesTeach = [];
      for (i = 0; i < teacher.coursesTeach.length; i++) {
        coursesTeach.push(teacher.coursesTeach[i]);
      }
      const newTeacher = {
        firstName: teacher?.firstName ?? "",
        lastName: teacher?.lastName ?? "",
        age: teacher?.age ?? "",
        teacherId: teacher?.teacherId ?? "",
        education: teacher?.education ?? "",
        coursesTeach: coursesTeach,
      };
      await Teacher.doc(teacherId).update(newTeacher);
      return res.status(200).send({ message: "Teacher Updated successfully" });
    }
    res.status(404).send({ message: "Teacher Not Found" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteTeacher = async (req, res) => {
  const { teacherId } = req.query;
  try {
    const teacher = await Teacher.doc(teacherId).get();
    if (teacher.exists) {
      await Teacher.doc(teacherId).delete();
      return res.status(200).send({ message: "Teacher Deleted successfully" });
    }
    res.status(404).send({ message: "Teacher Not Found" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getTeachers,
  getTeacherById,
  addTeacher,
  updateTeacher,
  deleteTeacher,
};
