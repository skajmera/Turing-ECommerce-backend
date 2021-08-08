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

const product=require('./routes/product')
app.use('/',product)

const customer=require('./routes/customer')
app.use('/',customer)


const order=require('./routes/order')
app.use('/',order)


const shopping_cart=require('./routes/shopping_cart')
app.use('/',shopping_cart)
app.listen(port,()=>{
    console.log(`connected ${port}`);
})


//////"email":"lannucci@hotmail.com" ,
/////"password":"subhash"
/*{"order_id": 1,
  "product_id": 1,
  "attributes": "LG, Red",
  "product_name": "Arc d'Triomphe",
  "quantity": 1,
  "unit_cost": "14.99",
  "subtotal": "14.99",
  "total_amount": 1,
  "created_on": "",
  "shipped_on": "",
  "status": "paid",
  "name": "Test",
  "cart_id":1,
  "email":"lannucci@hotmail.com" ,
    "password":"subhash"
}   */



/*
"cart_id":"2",
    "shipping_id":1,
    "tax_id":1,
    "email":"lannucci@hotmail.com" ,
    "password":"subhash"
    */