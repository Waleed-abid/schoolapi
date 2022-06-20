const express = require("express");
const morgan = require("morgan")
const dotenv =  require("dotenv");
const studentRoutes = require("./routes/studentRoute")
const app = express();
require("./config")
dotenv.config();
app.use(morgan("dev"))
app.use(express.json())

app.use("/student",studentRoutes)

const port = process.env.port || 4000

app.listen(port, ()=> console.log(`Running On Port ${port}`));