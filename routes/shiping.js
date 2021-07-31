const express=require('express')
const router=express.Router()
const knex=require('../database/turingdb')

router.get('/shipping/regions',(req,res)=>{
    knex
    .select('*')
    .from('shipping_region')
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log(err);
    })
})

router.get('/shipping/regions/:shipping_region_id',(req,res)=>{
    knex
    .select('*')
    .from('shipping')
    .where('shipping_region_id',req.params.shipping_region_id)
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports=router;