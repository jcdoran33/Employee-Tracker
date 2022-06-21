// requirements
const express = require("express");
const mysql = require("mysql2");

//PORT
const PORT = process.env.PORT || 3001;
//define app as express()
const app = express();

//Express - middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());