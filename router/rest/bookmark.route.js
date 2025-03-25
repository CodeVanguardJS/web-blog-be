const express = require('express')
const BookmarkController = require('../../controllers/bookmark.controller')
const authMiddleware = require('../../middlewares/authMiddleware')

const router = express.Router()

router.post('/', authMiddleware, BookmarkController.addBookmark)
router.get('/', authMiddleware, BookmarkController.getBookmarks)
router.delete('/:article_id', authMiddleware, BookmarkController.removeBookmark)

module.exports = router
