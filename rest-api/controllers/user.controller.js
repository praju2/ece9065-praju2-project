const User = require('../models/user.model');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const env_path=process.cwd()+'\\config\\env-config.env';
require('dotenv').config({path : env_path}); 
const secret = process.env.SECRET;

exports.create_user = function (req, res, next) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { return next(err); }
        else {
            if (user) {
                let error = 'Email Address Exists in Database.';
                return res.status(400).json(error);
            } else {
                argon2.hash(req.body.password).then(hash => {
                    const user = new User(
                        {
                            username: req.body.username,
                            email: req.body.email,
                            password: hash,
                            role: req.body.role,
                            active: req.body.active
                        }
                    );
                    user.save(function (err, user) {
                        if (err) {
                            return next(err);
                        } else {
                            res.send('User created successfully');
                        }
                    });
                    //console.log(hash);  
                    //argon2.verify(hash, "password")  .then(correct => console.log(correct ? 'Correct password!' : 'Incorrect password'));
                });
            }

        }
    });



};

exports.authenticate_user = function (req, res, next) {

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { return next(err); }
        else {
            if (!user) {
                //errors.email = "No Account Found";
                //return res.status(404).json(errors);
                res.send('No Account Found');
            } else {
                argon2.verify(user.password, req.body.password).then(correct => {
                    if (correct) {
                        const payload = {
                            id: user._id,
                            name: user.username,
                            email: user.email,
                            role : user.role,
                            active : user.active
                        };
                        jwt.sign(payload, secret, { expiresIn: 36000 },
                            (err, token) => {
                                if (err) res.status(500)
                                    .json({
                                        error: "Error signing token",
                                        raw: err
                                    });
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`
                                });
                            });

                    }
                    else { res.send('Incorrect Password'); }

                }


                    //res.send(correct ? 'Correct password!' : 'Incorrect password')
                );
            }
            // res.send(user);
        }
    });




};


exports.modify_user = function (req, res, next) {
    User.findById(req.body.user_id, function (err, user) {
        if (err) {
            return next(err);
        } else {
            if (user != undefined) {
                if (req.body.role != undefined) { user.role = req.body.role; }
                if (req.body.active != undefined) { user.active = req.body.active; }


                user.save(function (err, user) {
                    if (err) {
                        return next(err);
                    } else {
                        res.send('User modified successfully');
                    }
                });
            }
            else {
                res.send('User not found');
            }
        }
    });
};

