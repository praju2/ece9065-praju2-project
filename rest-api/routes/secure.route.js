const express = require('express');
const router = express.Router();

const playlist_controller = require('../controllers/playlist.controller');
const review_controller = require('../controllers/review.controller');
const song_controller = require('../controllers/song.controller');


router.post('/song', song_controller.song_create);

router.post('/review', review_controller.create);

router.get('/playlist/user/:user_id', playlist_controller.user_playlist); //get playlist of the authenticated user
router.get('/playlist/:playlist_id', playlist_controller.details); //get full details of the selected playlist
router.get('/playlist/search/:search_key', playlist_controller.fuzzy_search); //get playlist fuzzy search
router.post('/playlist', playlist_controller.create_playlist); //create playlist
router.put('/playlist', playlist_controller.modify_playlist); //modify playlist
router.delete('/playlist', playlist_controller.delete_playlist); //delete playlist
module.exports = router;