/* eslint-disable semi */
const LikeRepository = require('../repositories/like.repository');

class LikeService {
  static async toggleLike (userId, articleId) {
    return await LikeRepository.toggleLike(userId, articleId);
  }

  static async getUserLikes (userId) {
    return await LikeRepository.getUserLikes(userId);
  }

  static async getLikeCount (articleId) {
    return await LikeRepository.getLikeCount(articleId);
  }
}

module.exports = LikeService;
