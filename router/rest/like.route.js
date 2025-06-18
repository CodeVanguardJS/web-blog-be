const express = require('express')
const LikeController = require('../../controllers/like.controller')
const authMiddleware = require('../../middlewares/authMiddleware')

const router = express.Router()

router.post('/', authMiddleware, LikeController.toggleLike)
router.get('/', authMiddleware, LikeController.getUserLikes)
router.get('/count/:articleId', LikeController.getLikeCount)
router.get('/article/:articleId', LikeController.getLikesByArticleId)
router.delete('/article/:articleId', authMiddleware, LikeController.deleteLikeByArticleId)
router.get('/dashboard/summary/:userId', authMiddleware, LikeController.getDashboardSummary)

module.exports = router
