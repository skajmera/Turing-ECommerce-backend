const express = require("express");
const mysql = require("mysql");
const app = express();
const jwt = require("jsonwebtoken")
app.use(express.json())
const database=require('./database/turingdb')
const port=4800

const attribute=require('./routes/attribute')
app.use('/',attribute)

app.listen(port,()=>{
    console.log(`connected ${port}`);
})