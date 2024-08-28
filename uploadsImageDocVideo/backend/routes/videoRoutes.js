const express = require('express');
const router = express.Router();
const { uploadVideo, getVideos } = require('../controllers/videoController');

router.post('/', uploadVideo);
router.get('/', getVideos); 

module.exports = router;
