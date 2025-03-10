const Song = require('../models/song.model');
const Fuse = require('fuse.js');
const review_controller = require('./review.controller');

exports.song_all = function (req, res, next) {
    Song.find({}).sort('-_id').exec(function (err, item) {
        if (err) return next(err);
        res.send(item);
    });
};

//Top songs as per user rating and recent reviews
exports.top_n_songs = function (req, res, next) {
    Song.find({hidden:{$ne:false}}).sort('-Rating').limit(10).populate({ path: 'Reviews', options: { sort: { _id: -1 }, limit: 2 }, populate: { path: 'user_id' } }).exec(function (err, item) {
        if (err) return next(err);
        res.send(item);
    });
};

//https://stackoverflow.com/questions/24714166/full-text-search-with-weight-in-mongoose
//https://fusejs.io/
exports.fuzzy_search = function (req, res, next) {
    Song.find(
        {   hidden:{$ne:false},
             $text: { $search: req.params.search_key } },
        { score: { $meta: "textScore" } }
    )
        .sort({ score: { $meta: 'textScore' } })
        .exec(function (err, item) {
            if (err) return next(err);
            if (item.length != 0) {
                res.send(item);
            }
            else {
                Song.find({hidden:{$ne:false}}).exec(function (err, item) {
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
                                "Title",
                                "Artist",
                                "Album",
                                "Genre",
                                "Year",
                                "Track"
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


exports.details = function (req, res, next) {
    Song.findById(req.params.id).populate({ path: 'Reviews', options: { sort: { _id: -1 }, limit: 2 }, populate: { path: 'user_id' } }).exec(function (err, item) {
        if (err) return next(err);
        res.send(item);
    });
};



exports.delete = function (req, res, next) {
    Song.findByIdAndDelete(req.body.id, function (err, item) {
        if (err) return next(err);
        res.send(item);
    });

};


exports.song_create = function (req, res, next) {
    let song = new Song(
        {
            Title: req.body.Title,
            Artist: req.body.Artist,
            Album: req.body.Album,
            Track: req.body.Track,
            Year: req.body.Year,
            Length: req.body.Length,
            Genre: req.body.Genre,
            Reviews: [],
            Hidden: req.body.Hidden
        }
    );
  
    song.save(function (err, song) {
        if (err) {
            return next(err);
        }
        if (req.body.desc != undefined) {
            review_controller.addReview(req, res, next, song._id);
        }
        res.status(200).send(song);

    }
    );

};

exports.song_modify = function (req, res, next) {
    Song.findById(req.body._id, function (err, song) {
        if (err) { return next(err); }
        if (req.body.Title != undefined) { song.Title = req.body.Title; }
        if (req.body.Artist != undefined) { song.Artist = req.body.Artist; }
        if (req.body.Album != undefined) { song.Album = req.body.Album; }
        if (req.body.Track != undefined) { song.Track = req.body.Track; }
        if (req.body.Year != undefined) { song.Year = req.body.Year; }
        if (req.body.Length != undefined) { song.Length = req.body.Length; }
        if (req.body.Genre != undefined) { song.Genre = req.body.Genre; }
        if (req.body.Hidden != undefined) { song.Hidden = req.body.Hidden; }
        song.save(function (err, song) {
            if (err) {
                return next(err);
            }
            res.status(200).send(song);

        }
        );
    });


};


exports.delete_song = function (req, res, next) {  
    Song.findByIdAndDelete(req.params.id, function (err, song) {
        if (err) return next(err);
        
        review_controller.deleteReviews(req, res, next, req.params.id);
        res.status(200).send({msg:'Song and its Review deleted successfully'});        
    });

};

