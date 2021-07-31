const express = require("express");
// const mysql = require("mysql");
const app = express();
require('dotenv').config()
// const jwt = require("jsonwebtoken")
app.use(express.json())
const port=process.env.db_port||4000

const attribute=require('./routes/attribute')
app.use('/',attribute)


const department=require('./routes/department')
app.use('/',department)


const category=require('./routes/categories')
app.use('/',category)

const tax=require('./routes/tax')
app.use('/',tax)


const shipping=require('./routes/shiping')
app.use('/',shipping)

app.listen(port,()=>{
    console.log(`connected ${port}`);
})

