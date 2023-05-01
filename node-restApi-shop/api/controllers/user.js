const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/user');

exports.sign_up_user = (res,req,next)=>{
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(410).json({
                error: 'User already exists'
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                } else {
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
                }
            })
        }
    })
};

exports.login_in_user =(res,req,next)=>{
    User.find({ email: req.body.email })
    .select('_id email password')
    .exec()
    .then(user=>{
        if (user.length < 1) {
            return res.status(401).json({
                error: 'Auth failed'
            })
        }
        bcrypt.compare(req.body.password, user[0].password,(err,result)=>{
            if(err){
                console.log(err);
                return res.status(401).json({
                    error: 'Auth failed'
                })
            }else{
                if(result){
                const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    },
                    'secretjaey',
                    {
                        expiresIn: '1h'
                    });
                    res.status(200).json({
                        message: 'Auth success',
                        user: user[0],
                        token: token
                    })
                }else{
                    res.status(401).json({
                        error: 'Auth failed'
                    })
                }
            }
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
};

exports.delete_user=(res,req,next)=>{
    User.deleteOne({ _id: req.params.userId })
    .exec()
    .then(
        result => {
        return res.status(200).json({
            message: 'User deleted'
        })
    })
    .catch(
        err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        }
    )

}