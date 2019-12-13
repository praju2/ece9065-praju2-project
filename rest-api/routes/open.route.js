const express = require('express');
const router = express.Router();
//const SchemaValidator = require('../middlewares/SchemaValidator');
//const validateRequest = SchemaValidator(true);

const user_controller = require('../controllers/user.controller');
const song_controller = require('../controllers/song.controller');
const review_controller = require('../controllers/review.controller');


router.post('/user/authenticate', user_controller.authenticate_user);

router.post('/user/signup', user_controller.create_user);
router.get('/user/verify/:token', user_controller.verify_user);


//router.post('/user/confirmation', user_controller.confirmationPost);
//router.post('/user/resend', user_controller.resendTokenPost);
//1
//2

router.get('/song/top_n', song_controller.top_n_songs);
router.get('/song/:id', song_controller.details);
router.get('/song/search/:search_key', song_controller.fuzzy_search);


router.get('/review/:song_id', review_controller.all_reviews);








module.exports = router;