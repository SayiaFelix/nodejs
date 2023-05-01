const mongoose = require('mongoose');
const Product = require('../model/product');


exports.product_get_all = (req,res,next)=>{
    Product.find()
    .select('name description price productImage _id')
    .exec()
    .then(docs => {
        // console.log(docs);
        const response = {
            count: docs.length,
            products: docs.map(doc => {
                return {
                    name: doc.name,
                    price: doc.price,
                    description: doc.description,
                    productImage: doc.productImage,
                    _id: doc.id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:8000/products/' + doc._id
                    }
                }
            })
        }
        // if(docs.length>= 0){
        res.status(200).json(response)
        // }else{
        //     res.status(404).json({
        //         message: 'No entries found'
        //     })}
        // res.status(200).json({
        //   message: 'Welcome to the products route Safu, for Get requests'
        // });
        console.log(response);
    }).
    catch(err => {
        console.log(err)
        res.status(500).json({ error: err })
    })
};

exports.product_post_all = (req,res,next)=>{
    console.log(req.file)
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        productImage: req.file.path

    });
    product.save()
        .then(
            result => {
                console.log(result)
                res.status(201).json({
                    message: 'Created Items',
                    createdProduct: {
                        name: result.name,
                        description: result.description,
                        price: result.price,
                        _id: result._id,
                        request: {
                            type: "Get",
                            url: 'http://localhost:8000/products/' + result._id

                        }
                    }
                });
            })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err })
        })
};

exports.product_get_by_id = (req,res,next)=>{
    const id = req.params.productId;
    Product.findById(id)
        .select('name description price _id productImage')
        .exec().
        then(
            doc => {
                console.log('From db', doc)
                if (doc) {
                    res.status(200).json(doc);
                } else {
                    res.status(404).json({
                        message: 'Product not found'
                    });
                }

            })
        .catch(err => {
            console.error(err)
            res.status(500).json({ error: err })
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
};

exports.product_update =(req,res,next)=>{
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.updateOne({ _id: id },{ $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Product updated successfully',
                request: {
                    type: 'GET',
                    url: 'http://localhost:8000/products/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

exports.product_delete = (req,res,next)=>{
    const id = req.params.productId;
    Product.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Product deleted successfully',
                request: {
                    type: 'POST',
                    url: 'http://localhost:8000/products/',
                    body: { name: 'String', description: 'String', price: 'Number' }
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
};