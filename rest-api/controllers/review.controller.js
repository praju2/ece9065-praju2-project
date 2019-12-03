const Review = require('../models/review.model');
const Song = require('../models/song.model');

exports.review_details = function (req, res, next) {
    Song.find(req.params.id, function (err, item) {
        if (err) return next(err);
        res.send(item);
    });
};
//to fix regarding output
exports.create = function (req, res, next) {
    addReview(req, res, next, req.body.song_id);
    res.send('Review attached successfully');
};

exports.all_reviews = function (req, res, next) {
    Review.find({ song_id: req.params.song_id }).exec(function (err, item) {
        if (err) return next(err);
        res.send(item);
    });
};

function addReview(req, res, next, song) {
    let avgRating = 0;
    const review = new Review(
        {

            desc: req.body.desc,
            rating: req.body.rating,
            user_id: req.body.user_id,
            song_id: song
        }
    );
    review.save(function (err, review) {
        if (err) {
            return next(err);
        } else {
            Song.findById(song).populate({ path: 'Reviews' }).exec(function (err, song) {
                if (err) { return next(err); }
                else if (song.Reviews != undefined) {
                    let rating = 0;
                    let i = 0;
                    if (review.rating != undefined && review.rating >= 1 && review.rating <= 5) {
                        rating = review.rating;
                        i++;
                    }
                    song.Reviews.forEach(element => {
                        if (element.rating != undefined) {
                            rating += element.rating;
                            i++;
                        }
                    });
                    if (rating != 0 && i != 0) {
                        avgRating = rating / i;
                    }
                    Song.findById(song, function (err, song) {
                        if (err) return next(err);
                        song.Reviews.push(review._id);
                        song.Rating = Math.round(avgRating);
                        song.save(function (err, song) {
                            if (err) {
                                return next(err);
                            }
                            console.log('Review attached successfully');
                        }
                        );
                    });
                }
            });
        }
    });
}


exports.delete_review = function (req, res, next) {
    Review.findByIdAndDelete(req.body.review_id, function (err, review) {
        if (err) return next(err);
        res.send('Review deleted successfully');
    });

};

function deleteReviews(req, res, next, song) {

    Review.deleteMany({ song_id: song }, function (err, review) {
        if (err) {
            return next(err);
        } else {
            console.log('deleted all the reviews of the song');
        }
    });
}


exports.addReview = addReview;
exports.deleteReviews = deleteReviews;    