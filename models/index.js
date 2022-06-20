const { db } = require("../config")

const Students = db.collection("students")


module.exports= {
    Students
}