const express = require('express')
const BookmarkController = require('../../controllers/bookmark.controller')
const authMiddleware = require('../../middlewares/authMiddleware')

const router = express.Router()

router.post('/', authMiddleware, BookmarkController.toggleBookmark)
router.get('/', authMiddleware, BookmarkController.getBookmarks)

module.exports = router
