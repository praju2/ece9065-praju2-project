const User = require('../models/user.model');
const Token = require('../models/token.model');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const env_path = process.cwd() + '\\config\\env-config.env';
require('dotenv').config({ path: env_path });
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
                            password: hash
                        }
                    );
                    user.save(function (err, user) {
                        if (err) {
                            return next(err);
                        } else {

                            var transporter = nodemailer.createTransport({
                                host: "smtp-relay.sendinblue.com",
                                port: 587,
                                secure: false, // upgrade later with STARTTLS
                                auth: {
                                    user: process.env.SENDINBLUE_USERNAME,
                                    pass: process.env.SENDINBLUE_PASSWORD
                                }
                            });

                            transporter.verify(function (error, success) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log("Server is ready to take our messages");
                                }
                            });

                            var token = new Token({ _userId: user._id, token: require('crypto').randomBytes(16).toString('hex') });
                            // Save the verification token
                            token.save(function (err) {
                                if (err) {
                                    return next(err);
                                } else {
                                    var mailOptions = { from: 'no-reply@ece9065-praju2-project.com', to: user.email, subject: 'Account Verification', html:"<b>Hello </b></br><p>Please verify your account by clicking the link: <a href='http://" + req.headers.host +"/api/open/user/verify/"+ token.token +"'>click here</a> </p>" };
                                    transporter.sendMail(mailOptions, function (err) {
                                        if (err) { return res.status(500).send({ msg: err.message }); }
                                        //res.status(200).send('A verification email has been sent to ' + user.email + '.');
                                        res.status(200).send(user);
                                    });
                                }
                            });
                        }
                    });
                });
            }
        }
    });
};

exports.verify_user = function (req, res, next) {

    // Find a matching token
    Token.findOne({ token: req.params.token }, function (err, token) {
        if (err) {
            return next(err);
        } else {
            if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });

            // If we found a token, find a matching user
            User.findById(token._userId, function (err, user) {
                if (err) {
                    return next(err);
                } else {
                    if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
                    if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });

                    // Verify and save the user
                    user.isVerified = true;
                    user.save(function (err) {
                        if (err) { return res.status(500).send({ msg: err.message }); }
                        res.status(200).send("The account has been verified. Please log in.");
                    });
                }
            });
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
                            role: user.role,
                            active: user.active
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
                            res.status(200).send({token});
                    }
                    else { res.status(400).send({type:'auth-failed', msg:'Incorrect Password'}); }

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

