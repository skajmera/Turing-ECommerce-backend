const { Router } = require('express')
const router=Router()
const knex=require('../database/turingdb')

router.get('/categories',(req,res)=>{
    knex
    .select('*')
    .from('category')
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log(err);
    })
})
router.get('/categories/:categor_id',(req,res)=>{
    knex
    .select('*')
    .from('category')
    .where('category_id',req.params.categor_id)
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log(err);
    })
})
router.get("/categories/inProduct/:product_id", (req, res) =>{
    var product_id = req.params.product_id;
    knex
    .select(
        'category.category_id',
        'department_id',
        'name'
    )
    .from('category')
    .join('product_category', function(){
        this.on('category.category_id', 'product_category.category_id')
    })
    .where('product_category.product_id', product_id)
    .then((data) =>{
        res.send(data);
    }).catch((err) =>{
        console.log(err);
    })
})


router.get("/categories/inDepartment/:department_id", (req, res) =>{
    var department_id = req.params.department_id;
    knex
    .select(
        'category_id',
        'name',
        'description',
        'department_id'
    )
    .from('category')
    .where('department_id', department_id)
    .then((data) =>{
        res.send(data);
    }).catch((err) =>{
        console.log(err);
    })
})
module.exports=router

