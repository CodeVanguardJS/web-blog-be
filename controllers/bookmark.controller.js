/* eslint-disable camelcase */
const BookmarkService = require('../services/bookmark.service')
const { successResponse, errorResponse } = require('../helpers/response')

class BookmarkController {
  static async toggleBookmark (req, res) {
    try {
      const { article_id } = req.body
      const user_id = req.user.id

      const result = await BookmarkService.toggleBookmark(user_id, article_id)
      return successResponse(res, result.data, result.message)
    } catch (error) {
      return errorResponse(res, error.message, [], 500)
    }
  }

  static async getBookmarks (req, res) {
    try {
      const user_id = req.user.id
      const bookmarks = await BookmarkService.getUserBookmarks(user_id)
      return successResponse(res, bookmarks, 'Bookmarks retrieved successfully', 200)
    } catch (error) {
      return errorResponse(res, error.message, [], 500)
    }
  }
}

module.exports = BookmarkController
