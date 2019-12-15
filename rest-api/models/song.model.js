const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let songSchema = new Schema({
    Title: { type: String, required: true, max: 300 },
    Artist: { type: String, required: true, max: 300 },
    Album: { type: String, required: true, max: 300 },
    Track: { type: Number, required: true, max: 999 },
    Year: { type: Number, required: true, max: 2021 },
    Length: { type: Number, required: true, max: 2000 },
    Genre: { type: String, required: true, max: 300 },
    Reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    Rating: { type: Number, max: 5 },
    Hidden: { type: Boolean, required: true, default: false },
}, { collection: 'songs' });

songSchema.index({ Title: 'text', Artist: 'text', Album: 'text', Genre: 'text' }, {name: 'Song Index', weights: {Title: 10, Artist: 4, Album: 2, Genre: 1}});
// Export the model
module.exports = mongoose.model('Song', songSchema);
//module.exports.schema = songSchema;
