# schoolapi

This a basic CRUD school api in which you can add Students delete students update students get students by id and firstName, Moreover It has Courses routes too which allows us to read create update delete courses. Also it contains Teacher routes which allows us to read create delete teachers.

It also has a nested courses route which allows us to read create delete courses for students, It first checks if the course exists in courses collection and if it does it adds it to students courses collection inside a student. It also has a Authentication for students admin and teachers so that not every student can add courses to other students. Similarly with the teachers. Admin will have all the functionality avaliable to him, He can create remove update and delete courses, Students and teachers.

Some Endpoints are:

For Students:
| HTTP Method | Endpoint |
| --- | --- |
| @GET | /getAllStudents |
| @GET firstName | /getStudentByFirstName |
| @POST | /addStudent |
| @PUT | /updateStudent |
| @DELETE | /deleteStudent |

For Courses:
| HTTP Method | Endpoint |
| --- | --- |
| @GET All | /getAllCourses |
| @GET | /getCourseById |
| @POST | /addCourse |
| @POST Multiple | /addMultipleCourse |
| @PUT | /updateCourse |
| @DELETE | /deleteCourse |

Some Student courses endpoints are still under development and will be update soon. Same wit the Teacher Routes.
To the run the API please use these commands
`npm install`

> Before running the Application, You are required to go to the firebase console and download your serviceAccount key. You can download it by heading to firebase console > Project Settings > Service Account > Create New Service Key > then paste it in Config folder and rename it to ServiceAccount.json after that create an index.js file and write the following code in it

```var admin = require("firebase-admin");
const {getFirestore} = require("firebase-admin/firestore")

var serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebase.io`,
});
const db = getFirestore();
module.exports = {
    db
}
```

After doing that Run the following Command
`npm run dev`
