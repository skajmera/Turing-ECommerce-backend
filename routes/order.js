const express = require('express')
const jwt = require('jsonwebtoken')
const { authenticateToken } = require('../auth/jwt')
const router = express.Router()
const knex = require('../database/turingdb')
router.post('/orders', authenticateToken, (req, res) => {

    knex
        .select("*")
        .from("shopping_cart")
        .where("cart_id", req.body.cart_id)
        .join("product", function () {
            this.on('shopping_cart.product_id', 'product.product_id')
        })

        .then((data) => {
            var customer_id = req.token_data.customer_id;
            knex("orders").insert({
                "total_amount": data[0].quantity * data[0].price,
                "created_on": new Date(),
                "customer_id": customer_id,
                "shipping_id": req.body.shipping_id,
                "tax_id": req.body.tax_id
            }).then((result) => {
                knex("order_detail").insert({
                    "unit_cost": data[0].price,
                    "quantity": data[0].quantity,
                    "product_name": data[0].name,
                    "attributes": data[0].attributes,
                    "product_id": data[0].product_id,
                    "order_id": result[0]
                })
                    .then((resu) => {
                        console.log(resu)
                    }).catch((err) => {
                        console.log(err.message)
                    })

            })
                .then((detail) => {
                    knex.select("*").from("shopping_cart").where("cart_id", req.body.cart_id).delete()
                        .then(() => {
                            res.send({ "order Id": "orders successfully" })
                        }).catch((err) => {
                            res.send(err)
                        })
                }).catch(() => {
                    res.send({ "error": "error in insserting data in orders detail." })
                })
        }).catch((err) => {
            res.send({ "error": err.message })
        }).catch((err) => {
            res.send(err)
        })
})




router.get('/orders/:order_id', authenticateToken, (req, res) => {
    knex.select('orders.order_id',
        'product.product_id',
        'order_detail.attributes',
        'product.name as product_name',
        'order_detail.quantity',
        'product.price',
        'order_detail.unit_cost').from('orders')
        .join('order_detail', function () {
            this.on('orders.order_id', 'order_detail.order_id')
        }).join('product', function () {
            this.on('order_detail.product_id', 'product.product_id')
        }).where('orders.order_id', req.params.order_id)
        .then((data) => {
            res.send(data)
        }).catch((err) => {
            res.send({ err: err.message })
        })
})



router.get('/orders/inCustomer/data', authenticateToken, (req, res) => {

    var customer_id = req.token_data.customer_id
    knex.select('*')
    .from('customer')
    .where('customer_id', customer_id)
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send({ err: err.message })
        })
})




router.get('/orders/shortdetail/:order_id', authenticateToken, (req, res) => {
    const order_id = req.params.order_id;
    knex.select('order_id', 'total_amount', "created_on", "shipped_on", "status", 'product.name').from('orders').join('product', function () {
        this.on('orders.order_id', 'product.product_id')
    }).where('orders.order_id', order_id).then((data) => {
        res.send(data)
    })

})


module.exports = router