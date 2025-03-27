const express = require('express')
const LikeController = require('../../controllers/like.controller')
const authMiddleware = require('../../middlewares/authMiddleware')

const router = express.Router()

router.post('/', authMiddleware, LikeController.toggleLike)
router.get('/', authMiddleware, LikeController.getUserLikes)
router.get('/count/:articleId', LikeController.getLikeCount)

module.exports = router
