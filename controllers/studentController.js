const { Students } = require("../models");

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

module.exports = {
  getStudents,
  getStudentById,
};
