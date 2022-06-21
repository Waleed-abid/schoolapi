const express = require("express");
const dotenv = require("dotenv");
require("./config");
const morgan = require("morgan");
const app = express();
const studentRoutes = require("./routes/studentRoute");
const courseRoutes = require("./routes/courseRoute");
const port = process.env.port || 6000;
dotenv.config();

app.use(morgan("dev"));
app.use(express.json());

app.use("/student", studentRoutes);
app.use("/course", courseRoutes);

app.listen(port, () => console.log(`Running On Port ${port}`));
