const express = require('express');
const router = express.Router();
//const SchemaValidator = require('../middlewares/SchemaValidator');
//const validateRequest = SchemaValidator(true);

const user_controller = require('../controllers/user.controller');
const song_controller = require('../controllers/song.controller');
const review_controller = require('../controllers/review.controller');


router.post('/user/authenticate', user_controller.authenticate_user);

router.get('/song/top_n', song_controller.top_n_songs);
router.get('/song/:id', song_controller.details);

router.get('/review/:song_id', review_controller.all_reviews);








module.exports = router;