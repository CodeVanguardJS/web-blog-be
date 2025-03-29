/* eslint-disable camelcase */
const BookmarkRepository = require('../repositories/bookmark.repository')
const { successResponse, errorResponse } = require('../helpers/response')
class BookmarkController {
  static async addBookmark (req, res) {
    try {
      const { article_id } = req.body
      const user_id = req.user.id

      const existingBookmark = await BookmarkRepository.checkBookmark(user_id, article_id)
      if (existingBookmark) {
        return errorResponse(res, 'Bookmark already exists', [], 400)
      }

      const bookmark = await BookmarkRepository.createBookmark(user_id, article_id)
      return successResponse(res, bookmark, 'Bookmark created successfully', 201)
    } catch (error) {
      return errorResponse(res, error.message, [], 500)
    }
  }

  static async removeBookmark (req, res) {
    try {
      const { article_id } = req.params
      const user_id = req.user.id

      await BookmarkRepository.deleteBookmark(user_id, Number(article_id))
      return successResponse(res, null, 'Bookmark successfully deleted', 200)
    } catch (error) {
      return errorResponse(res, error.message, [], 500)
    }
  }

  static async getBookmarks (req, res) {
    try {
      const user_id = req.user.id
      const bookmarks = await BookmarkRepository.getUserBookmarks(user_id)
      return successResponse(res, bookmarks, 'Bookmarks retrieved successfully', 200)
    } catch (error) {
      return errorResponse(res, error.message, [], 500)
    }
  }
}

module.exports = BookmarkController
