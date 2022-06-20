const { Students } = require("../models")

const getStudents = async(req,res)=>
{
    try {
     let students = []
    let studentsRef = await Students.get();
    for(const doc of studentsRef.docs){
        students.push({id: doc.id, ...doc.data()})
    }
    res.status(200).send({students})   
    } catch (error) {
        res.status(500).send({error: error.message})
    }
}

module.exports = {
    getStudents
}