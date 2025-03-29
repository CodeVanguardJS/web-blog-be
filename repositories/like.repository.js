/* eslint-disable camelcase */
/* eslint-disable semi */
const prisma = require('../libs/prisma');

class LikeRepository {
  static async toggleLike (user_id, article_id) {
    const existingLike = await prisma.like.findFirst({
      where: { user_id, article_id }
    });

    if (existingLike) {
      await prisma.like.delete({
        where: { id: existingLike.id }
      });
      return { message: 'Like removed', data: null };
    }

    const newLike = await prisma.like.create({
      data: { user_id, article_id, status: true }
    });

    return { message: 'Like added', data: newLike };
  }

  static async getUserLikes (user_id) {
    return await prisma.like.findMany({
      where: { user_id },
      include: { article: true }
    });
  }

  static async getLikeCount (articleId) {
    const count = await prisma.like.count({
      where: { article_id: parseInt(articleId) }
    });

    return count;
  }
}

module.exports = LikeRepository;
