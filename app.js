// NPM packages
const express = require("express");
require("dotenv").config();

require("./db"); //importing Database config Module

const app = express(); //creating express app
app.use(express.urlencoded({ extended: true })); //url parser
app.use(express.json()); //body parser

app.get("/", (req, res) => res.json({ message: "Hi, This is an API" })); // home route welcome message

//Routes importing and using
app.use(require("./routes"));

module.exports = app; //exporting app to server
