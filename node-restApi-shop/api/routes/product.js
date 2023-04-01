const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../model/product');

router.get('/', (req,res,next)=>{
   res.status(200).json({
      message: 'Welcome to the products route Safu, for Get requests'
   });
});

router.post('/', (req,res,next)=>{
    // const product ={
    //    name : req.body.name,
    //    description: req.body.description,
    //    price : req.body.price
    // };

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        price : req.body.price

    });

    product.save().then(
        result=>{
            console.log(result)
        }).catch(err =>(console.error(err)))


    res.status(201).json({
       message: 'Welcome to the products route Jaey, for Post requests',
       createdProduct: product
    });
 });

router.get('/:productId', (req,res,next)=>{

    const id = req.params.productId;
    Product.findById(id).exec().then(
        res=>{
            console.log(result)
            res.status(200).json({
                message: 'you found this Product',
                product: result
            });
        }).catch(err =>{
            console.error(err)
            res.status(500).json({ error: err})
        })

    // if(id ==='special')
    // {
    //     res.status(200).json({
    //         message: 'You discovered this Special productId',
    //         id: id

    //     });
    // }
    // else
    // {
    //     res.status(200).json({
    //         message: 'you found this ProductId'
    //     })
    // }
 });
 
 router.patch('/:productId', (req,res,next)=>{
    res.status(200).json({
            message: 'you updated this Product'
        });
 });

 router.delete('/:productId', (req,res,next)=>{
    res.status(200).json({
            message: 'you deleted this Product'
        });
 });

 module.exports = router;