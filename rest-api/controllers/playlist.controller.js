const Playlist = require('../models/playlist.model');
const songs = require('../models/song.model');
const Fuse = require('fuse.js');

exports.playlist = function (req, res, next) {
    Playlist.find({}).select('-songs').exec(function (err, playlist) {
        if (err) return next(err);
        res.send(playlist);
    });
};

//https://stackoverflow.com/questions/24714166/full-text-search-with-weight-in-mongoose
//https://fusejs.io/
exports.fuzzy_search = function (req, res, next) {   
    Playlist.find(
        { $text: { $search: req.params.search_key } },
        { score: { $meta: "textScore" } }
    )   
        .sort({ score: { $meta: 'textScore' } })
        .select('-songs')
        .exec(function (err, item) {
            if (err) return next(err);
            if (item.length != 0) {
                res.send(item);
            }
            else {
                Playlist.find({}).exec(function (err, item) {
                    if (err) { return next(err); }
                    else {
                        var options = {
                            shouldSort: true,
                            threshold: 0.4,
                            location: 0,
                            distance: 100,
                            maxPatternLength: 32,
                            minMatchCharLength: 3,
                            keys: [
                                "playlist_title",
                                "playlist_desc"
                            ]
                        };
                        var fuse = new Fuse(item, options); // "list" is the item array
                        item = fuse.search(req.params.search_key);
                        res.send(item);
                    }

                });


            }

        });

};

exports.user_playlist = function (req, res, next) {
    Playlist.find({ user_id: req.params.user_id }).select('-songs').exec(function (err, playlist) {
        if (err) return next(err);
        res.send(playlist);
    });
};


exports.details = function (req, res, next) {
    console.log('req.params.playlist_id',req.params.playlist_id);
    Playlist.findById(req.params.playlist_id).select('songs').populate({
        path: 'songs',
        populate: { path: 'Reviews', options: { sort: { _id: -1 }, limit: 2 }, populate: { path: 'user_id' } }
    }).exec(function (err, playlist) {
        if (err) return next(err);
        res.send(playlist.songs);
    });
};

exports.create_playlist = function (req, res, next) {

    const playlist = new Playlist(
        {
            playlist_title: req.body.playlist_title,
            playlist_desc: req.body.playlist_desc,
            user_id: req.body.user_id,
            songs: [req.body.song_id==undefined?null:req.body.song_id],
            visiblity: req.body.visiblity
        }
    );

    playlist.save(function (err, playlist) {
        if (err) {
            return next(err);
        } else {
            res.status(200).send(playlist);
        }
    });
};

exports.modify_playlist = function (req, res, next) {
    console.log("reached");
    Playlist.findById(req.body._id, function (err, playlist) {
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
                        res.status(200).send(playlist);
                    }
                });
            }
            else {
                res.status(400).send({msg:'Playlist not found'});
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

