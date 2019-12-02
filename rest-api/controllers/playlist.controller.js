const Playlist = require('../models/playlist.model');
const songs = require('../models/song.model');

exports.playlist = function (req, res, next) {
    Playlist.find({}).select('-songs').exec(function (err, playlist) {
        if (err) return next(err);
        res.send(playlist);
    });
};

exports.user_playlist = function (req, res, next) {
    Playlist.find({ user_id: req.params.user_id }).select('-songs').exec(function (err, playlist) {
        if (err) return next(err);
        res.send(playlist);
    });
};


exports.details = function (req, res, next) {
    Playlist.findById(req.params.playlist_id).populate({
        path: 'songs',
        populate: { path: 'Reviews', options: { sort: { _id: -1 }, limit: 2 }, populate: { path: 'user_id' } }
    }).exec(function (err, playlist) {
        if (err) return next(err);
        res.send(playlist);
    });
};

exports.create_playlist = function (req, res, next) {

    const playlist = new Playlist(
        {
            playlist_title: req.body.playlist_title,
            playlist_desc: req.body.playlist_desc,
            user_id: req.body.user_id,
            songs: [req.body.song_id],
            visiblity: req.body.visiblity
        }
    );

    playlist.save(function (err, playlist) {
        if (err) {
            return next(err);
        } else {
            res.send('Playlist attached successfully');
        }
    });
};

exports.modify_playlist = function (req, res, next) {
    Playlist.findById(req.body.playlist_id, function (err, playlist) {
        if (err) {
            return next(err);
        } else {
            if (playlist != undefined) {
                if (req.body.playlist_title != undefined) { playlist.playlist_title = req.body.playlist_title; }
                if (req.body.playlist_desc != undefined) { playlist.playlist_desc = req.body.playlist_desc; }
                if (req.body.visiblity != undefined) { playlist.visiblity = req.body.visiblity; }
                if (req.body.add_remove_mode != undefined) {
                    if (req.body.add_remove_mode == 'add' && req.body.song_id != undefined) { playlist.songs.push(req.body.song_id); }
                    else if (req.body.add_remove_mode == 'remove' && req.body.song_id != undefined) { playlist.songs.pop(req.body.song_id); }
                }

                playlist.save(function (err, playlist) {
                    if (err) {
                        return next(err);
                    } else {
                        res.send('Playlist modified successfully');
                    }
                });
            }
            else {
                res.send('Playlist not found');
            }
        }
    });
};


exports.delete_playlist = function (req, res, next) {
    Playlist.findByIdAndDelete(req.body.playlist_id, function (err, playlist) {
        if (err) return next(err);
        res.send('Playlist deleted successfully');
    });

};

