const express = require("express");
const morgan = require("morgan")
const dotenv =  require("dotenv");
const app = express();
dotenv.config();
app.use(morgan("dev"))
app.use(express.json())


const port = process.env.port || 4000

app.listen(port, ()=> console.log(`Running On Port ${port}`));