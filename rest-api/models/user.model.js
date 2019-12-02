const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    username: { type: String, required: true, max: 300 },
    role: { type: String, required: true, max: 300 },
    active: { type: Boolean, required: true, default: true },
}, { collection: 'user_details' });


// Export the model
module.exports = mongoose.model('User', userSchema);