const Song = require('../models/song.model');
const review_controller = require('./review.controller');

exports.song_all = function (req, res, next) {
    Song.find({}).sort('-_id').exec(function (err, item) {
        if (err) return next(err);
        res.send(item);
    });
};

//Top songs as per user rating and recent reviews
exports.top_n_songs = function (req, res, next) {
    Song.find({}).sort('-Rating').limit(10).populate({ path: 'Reviews', options: { sort: { _id: -1 }, limit: 2 }, populate: { path: 'user_id' } }).exec(function (err, item) {
        if (err) return next(err);
        res.send(item);
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
        res.send('Song Saved successfully');

    }
    );

};

exports.song_modify = function (req, res, next) {
    Song.findById(req.body.song_id, function (err, song) {
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
            res.send('Song Modified successfully');

        }
        );
    });


};


exports.delete_song = function (req, res, next) {
    Song.findByIdAndDelete(req.body.song_id, function (err, song) {
        if (err) return next(err);
        review_controller.deleteReviews(req, res, next, song._id);
        res.send('Song and its Review deleted successfully');
    });

};

