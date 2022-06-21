# schoolapi

This a basic CRUD school api in which you can add Students delete students update students get students by id and firstName, Moreover It has Courses routes too which allows us to read create update delete courses. Also it contains Teacher routes which allows us to read create delete teachers.

It also has a nested courses route which allows us to read create delete courses for students, It first checks if the course exists in courses collection and if it does it adds it to students courses collection inside a student. It also has a Authentication for students admin and teachers so that not every student can add courses to other students. Similarly with the teachers. Admin will have all the functionality avaliable to him, He can create remove update and delete courses, Students and teachers.

Some Endpoints are:

For Students:
@GET /getAllStudents
@GET All /getStudentById
@GET firstName /getStudentByFirstName
@POST /addStudent
@PUT /updateStudent
@DELETE /deleteStudent

For Courses:
@GET /getAllCourses
@GET All /getCourseById
@POST /addCourse
@POST Multiple /addMultipleCourse
@PUT /updateCourse
@DELETE /deleteCourse

Some Student courses endpoints are still under development and will be update soon. Same wit the Teacher Routes.
To the run the API please use this command first
>npm install 
After that use
>npm run dev
