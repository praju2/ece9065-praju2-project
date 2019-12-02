const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let reviewSchema = new Schema({
    desc: { type: String, required: true, max: 1500 },
    rating: { type: Number, required: true, max: 5 },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    song_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Song' },
}, { collection: 'reviews' });


// Export the model
module.exports = mongoose.model('Review', reviewSchema);