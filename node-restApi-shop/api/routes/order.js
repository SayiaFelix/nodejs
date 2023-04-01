const express = require('express')
const router = express.Router()

router.get('/' ,(req,res,next)=>{
    res.status(200).json({
        message: 'You have successfully fetch/get Order Product'
    })

})
router.post('/' ,(req,res,next)=>{
    const order ={
        productId:req.body.productId,
        quantity:req.body.quantity

    };
    res.status(201).json({
        message: 'You have successfully post Order Product',
        order:order
    })
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