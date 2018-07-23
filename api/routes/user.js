const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//for bcrypt
const bcrypt = require('bcrypt');

const User = require('../models/user')

router.post('/signup', (req, res, next) => {
    User.find({     //IMPORTANT!
        email: req.body.email
    })
        .exec()
        .then(user => {
            if (user.length >= 1) {   //checking for null
                res.status(409).json({
                    message: "Email is already registered"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'User created'
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                })
                            });
                    }
                });  //pwd, salting roundes
            }
        });

});

router.delete('/:id', (req, res, next) => {
    User.remove({ _id: req.params.id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User deleted"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
})

module.exports = router;