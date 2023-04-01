const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Order = require('../model/order')



router.get('/' ,(req,res,next)=>{
    res.status(200).json({
        message: 'You have successfully fetch/get Order Product'
    })

})
router.post('/' ,(req,res,next)=>{
    // const order ={
    //     productId:req.body.productId,
    //     quantity:req.body.quantity

    // };
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity:req.body.quantity,
        product:req.body.productId

    })
    order
    .save()
    .then(result=>{
        console.log(result)
        res.status(200).json(result)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error: err})
    }

    )
    // res.status(201).json({
    //     message: 'You have successfully post Order Product',
    //     order:order
    // })
})

router.get('/:orderId' ,(req,res,next)=>{
        res.status(200).json({
            message: 'You have successfully get Order Product by id',
            orderId: req.params.orderId
        })

})

router.delete('/:orderId' ,(req,res,next)=>{
        res.status(200).json({
            message: 'You have successfully delete Order',
            orderId: req.params.orderId,
        })
})


module.exports = router;