const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/user');


router.post('/', (res,req,next)=>{
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: hash
    });
    user.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'User created',
                user: result
            })
        })
        .catch(
            err => {
                console.log(err)
                res.status(500).json({
                    error: err
                })
            }
        )

 });

module.exports = router;
