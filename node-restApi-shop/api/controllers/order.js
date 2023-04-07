const mongoose = require('mongoose');
const Order = require('../model/order');
const Product = require('../model/product');

exports.order_get_all = (req, res, next) => {
    Order.find().select('product quantity _id')
        .populate('product', 'name')
        .exec()
        .then(docs => {
            res.status(200).json(
                {
                    counts: docs.length,
                    message: 'You Orders Include',
                    orders: docs.map(doc => {
                        return {
                            _id: doc._id,
                            product: doc.product,
                            quantity: doc.quantity,
                            request: {
                                type: 'GET',
                                url: 'http://localhost:3000/orders/' + doc._id
                            }
                        }
                    })
                });
        }).
        catch(err => {
            res.status(500).json({
                error: err
            });
        })
};

exports.order_post_all = (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: 'product not found'
                })
            }
            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            })
            return order.save();
        })
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: 'Ordered stored',
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders/' + result._id
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });

    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
    })
    order.save()
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: 'Ordered stored',
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders/' + result._id
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });

}

exports.order_get_by_id = (req, res, next) => {
    Order.findById(req.params.orderId)
        .populate('product')
        .exec()
        .then(order => {
            if (!order) {
                return res.status(404).json({
                    message: 'Order not Found'
                })

            };
            res.status(200).json({
                order: order,
                request: {
                    type: 'GET',
                    url: 'http://localhost:8000/orders'
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })

        });
}

exports.order_delete_by_id = (req, res, next) => {
    Order.deleteOne({ _id: req.params.orderId })
        .exec()
        .then(order => {
            res.status(200).json({
                message: 'You have successfully delete Order',
                request: {
                    type: 'POST',
                    url: 'http://localhost:8000/orders',
                    body: {
                        productId: 'ID', quantity: 'Number'
                    }
                }
            })

        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })

}
