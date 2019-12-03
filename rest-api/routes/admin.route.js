const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user.controller');
const song_controller = require('../controllers/song.controller');
const review_controller = require('../controllers/review.controller');
const playlist_controller = require('../controllers/playlist.controller');

router.put('/user', user_controller.modify_user);
router.post('/user', user_controller.create_user);


router.get('/song', song_controller.song_all);
router.post('/song', song_controller.song_create);
router.put('/song', song_controller.song_modify);
router.delete('/song', song_controller.delete_song);

router.delete('/review', review_controller.delete_review); //delete review


router.get('/playlist', playlist_controller.playlist); //get playlist of a particular user
router.get('/playlist/:playlist_id', playlist_controller.details); //get full details of the selected playlist
router.post('/playlist', playlist_controller.create_playlist); //crete playlist
router.put('/playlist', playlist_controller.modify_playlist); //modify playlist
router.delete('/playlist', playlist_controller.delete_playlist); //delete playlist



module.exports = router;