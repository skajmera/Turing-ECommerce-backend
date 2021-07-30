const express = require("express");
const mysql = require("mysql");
const app = express();
require('dotenv').config()
const jwt = require("jsonwebtoken")
app.use(express.json())
const port=process.env.db_port||4000

const attribute=require('./routes/attribute')
app.use('/',attribute)

app.listen(port,()=>{
    console.log(`connected ${port}`);
})