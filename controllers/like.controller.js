/* eslint-disable camelcase */
const LikeService = require('../services/like.service')

class LikeController {
  static async toggleLike (req, res) {
    try {
      const userId = req.user.id
      const { article_id } = req.body

      if (!article_id) {
        return res.status(400).json({ message: 'Article ID is required' })
      }

      const result = await LikeService.toggleLike(userId, article_id)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error: error.message })
    }
  }

  static async getUserLikes (req, res) {
    try {
      const userId = req.user.id
      const likes = await LikeService.getUserLikes(userId)
      return res.status(200).json({ data: likes })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error: error.message })
    }
  }

  static async getLikeCount (req, res) {
    try {
      const { articleId } = req.params
      const count = await LikeService.getLikeCount(articleId)
      return res.status(200).json({ articleId, likeCount: count })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error: error.message })
    }
  }
}

module.exports = LikeController
