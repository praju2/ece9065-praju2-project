//https://medium.com/@therealchrisrutherford/nodejs-authentication-with-passport-and-jwt-in-express-3820e256054f

const { Strategy, ExtractJwt } = require('passport-jwt');

const secret = process.env.SECRET;
const mongoose = require('mongoose');
const User = require('../models/user.model');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};

//this sets how we handle tokens coming from the requests that come
// and also defines the key to be used when verifying the token.
module.exports = passport => {
    passport.use(
        new Strategy(opts, (payload, done) => {           
            User.findById(payload.id)
                .then(user => {
                    if (user) {
                        return done(null, {
                            id: user._id,
                            name: user.username,
                            email: user.email,
                            role : user.role,
                            active : user.active
                        });
                    }
                    return done(null, false);
                }).catch(err => console.error(err));

        }));
};