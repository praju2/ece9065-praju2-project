const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    username: { type: String, required: true, max: 300 },
    email : {type: String, required : true, max:300,unique:true},
    password : {type: String, required : true, max:300},
    role: { type: String, required: true, max: 300,default: 'user' },
    isVerified: { type: Boolean, default: false },
    passwordResetToken: String,
    passwordResetExpires: Date
}, { collection: 'user_details' });

// /https://codemoto.io/coding/nodejs/email-verification-node-express-mongodb

// Export the model
module.exports = mongoose.model('User', userSchema);