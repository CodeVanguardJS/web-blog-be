/* eslint-disable camelcase */
const LikeService = require('../services/like.service')
const { successResponse, errorResponse } = require('../helpers/response')

class LikeController {
  static async toggleLike (req, res) {
    try {
      const userId = req.user.id
      const { article_id } = req.body

      if (!article_id) {
        return errorResponse(res, 'Article ID is required')
      }

      const result = await LikeService.toggleLike(userId, article_id)
      return successResponse(res, result.data, result.message)
    } catch (error) {
      return errorResponse(res, 'Internal server error', [error.message], 500)
    }
  }

  static async getUserLikes (req, res) {
    try {
      const userId = req.user.id
      const likes = await LikeService.getUserLikes(userId)
      return successResponse(res, likes)
    } catch (error) {
      return errorResponse(res, 'Internal server error', [error.message], 500)
    }
  }

  static async getLikeCount (req, res) {
    try {
      const { articleId } = req.params
      const count = await LikeService.getLikeCount(articleId)
      return successResponse(res, { articleId, likeCount: count })
    } catch (error) {
      return errorResponse(res, 'Internal server error', [error.message], 500)
    }
  }

  static async getLikesByArticleId (req, res) {
    try {
      const { articleId } = req.params
      const likes = await LikeService.getLikesByArticleId(articleId)
      return successResponse(res, likes)
    } catch (error) {
      return errorResponse(res, 'Internal server error', [error.message], 500)
    }
  }

  static async deleteLikeByArticleId (req, res) {
    try {
      const userId = req.user.id
      const { articleId } = req.params

      const result = await LikeService.deleteLikeByArticleId(userId, articleId)
      return successResponse(res, result.data, result.message)
    } catch (error) {
      return errorResponse(res, 'Internal server error', [error.message], 500)
    }
  }

  static async getDashboardSummary (req, res) {
    try {
      const userId = parseInt(req.params.userId)

      if (req.user.id !== userId) {
        return errorResponse(res, 'Unauthorized', [], 401)
      }

      const summary = await LikeService.getDashboardSummary(userId)
      return successResponse(res, summary)
    } catch (error) {
      return errorResponse(res, 'Internal server error', [error.message], 500)
    }
  }
}

module.exports = LikeController
