const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let playlistSchema = new Schema({
    playlist_title: { type: String, required: true, max: 300 },
    playlist_desc: { type: String, max: 300 },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    songs: [{ type: Schema.Types.ObjectId, ref: 'Song' }],
    visiblity: { type: String, required: true, max: 300, default: 'private' },
}, { collection: 'playlist' });


// Export the model
module.exports = mongoose.model('Playlist', playlistSchema);