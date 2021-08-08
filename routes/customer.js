// const { Router } = require('express')
var express = require('express')
const router = express.Router()
const knex = require('../database/turingdb')
const { generateAccessToken, authenticateToken } = require('../auth/jwt');

router.post("/customers", (req, res) => {
    knex
        .select('*')
        .from('customer')
        .where({ "email": req.body.email, "password": req.body.password })
        .then((data) => {
            if (data.length < 1) {
                knex('customer').insert(req.body)
                    .then((result) => {
                        res.send({ "message": "successfull iserted data" })
                    }).catch((err) => {
                        console.log(err);
                    })
            } else {
                res.send({
                    "exist": "this user alredy exists.."
                })
            }
        })
})
router.get('/customer/:customer_id', authenticateToken, (req, res) => {
    knex
        .select('*')
        .from('customer')
        .where('customer_id', req.params.customer_id)
        .then((data) => {
            res.send(data)
        }).catch((err) => {
            console.log(err);
        })
})

router.put('/customer/:customer_id', authenticateToken, (req, res) => {
    knex('customer')
        .where('customer_id', req.params.customer_id)
        .update(req.body)
        .then((data) => {
            res.send({ "messege": "update successfully" })
        }).catch((err) => {
            console.log(err);
        })
})
router.post('/customer/login', (req, res) => {
    knex
        .select('*')
        .from('customer')
        .where({ 'email': req.body.email, 'password': req.body.password })
        .then((data) => {
            const user = { email: data[0].email, customer_id: data[0].customer_id }
            const token = generateAccessToken(user)
            console.log(token)
            console.log('successfull login')
            res.cookie('token', token)
            res.send(data)
        }).catch((err) => {
            console.log(err);
        })
})

router.put('/address', authenticateToken, (req, res) => {
    var customer_id = req.token_data.customer_id;
    knex('customer')
        .where('customer_id', customer_id)
        .update({
            'address_1': req.body.address_1,
            'address_2': req.body.address_2,
            'city': req.body.city,
            'region': req.body.region,
            'postal_code': req.body.postal_code,
            'country': req.body.country,
            'shipping_region_id': req.body.shipping_region_id
        })
        .then((data) => {
            res.send({ "messege": "update successfully address" })
        }).catch((err) => {
            console.log(err);
        })
})


router.put('/credit_card', authenticateToken, (req, res) => {
    var customer_id = req.token_data.customer_id;
    knex('customer')
        .where('customer_id', customer_id)
        .update({
            "credit_card": req.body.credit_card
        })
        .then((data) => {
            res.send({ "messege": "update successfully credit_card" })
        }).catch((err) => {
            console.log(err);
        })
})

module.exports = router