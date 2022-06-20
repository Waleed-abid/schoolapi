const express = require("express");
const dotenv = require("dotenv");
require("./config");
const morgan = require("morgan");
const app = express();
const studentRoutes = require("./routes/studentRoute");
dotenv.config();
app.use(morgan("dev"));
app.use(express.json());

app.use("/student", studentRoutes);

const port = process.env.port || 4000;

app.listen(port, () => console.log(`Running On Port ${port}`));
