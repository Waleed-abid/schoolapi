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

module.exports = {
  getStudents,
  getStudentById,
  getStudentByfirstName,
  addStudent,
};
