const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../model/product');

router.get('/', (req,res,next)=>{
    Product.find()
    .exec().
    then( docs=>{
        console.log(docs);
        // if(docs.length>= 0){
              res.status(200).json(docs)
        // }else{
        //     res.status(404).json({
        //         message: 'No entries found'
        //     })}
        // res.status(200).json({
        //   message: 'Welcome to the products route Safu, for Get requests'
        // });
    }).
    catch(err=>{
        console.log(err)
        res.status(500).json({ error: err })
    })
 
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
               res.status(201).json({
                message: 'Welcome to the products route Jaey, for Post requests',
                createdProduct: result
          });
        })
        .catch(err =>{
            console.error(err);
            res.status(500).json({error:err})
        })
 });

router.get('/:productId', (req,res,next)=>{
    const id = req.params.productId;
    Product.findById(id)
    .exec().
    then(
        doc=>{
            console.log('From db',doc)

            if(doc){
                 res.status(200).json(doc);
            }else{
                res.status(404).json({
                    message: 'Product not found'
                });
            }
           
        })
    .catch(err =>{
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
    const id = req.params.productId;
    const updateOps ={};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;

    }
    Product.updateOne({_id: id},
        {$set: updateOps})
        .exec()
        .then(result=>{
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({error: err});
        }

        )
    // res.status(200).json({
    //         message: 'you updated this Product'

    //     });
 });

 router.delete('/:productId', (req,res,next)=>{
    const id = req.params.productId;
    Product.deleteOne({ _id: id })
    .exec()
    .then( result =>{
        res.status(200).json(result)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
          error: err
        })

    })

    res.status(200).json({
            message: 'you deleted this Product'
        });
 });

 module.exports = router;