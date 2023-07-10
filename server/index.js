require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const connection = require("./db");
const app = express();

connection();
app.use(cors());
app.use(express.json());


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));