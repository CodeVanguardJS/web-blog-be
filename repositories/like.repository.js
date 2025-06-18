/* eslint-disable camelcase */
/* eslint-disable semi */
const prisma = require('../libs/prisma')

class LikeRepository {
  static async toggleLike (user_id, article_id) {
    const existingLike = await prisma.like.findUnique({
      where: {
        article_id_user_id: {
          article_id,
          user_id
        }
      }
    })

    if (existingLike) {
      // UNLIKE
      await prisma.like.delete({
        where: {
          article_id_user_id: {
            article_id,
            user_id
          }
        }
      })

      await prisma.article.update({
        where: { id: article_id },
        data: { total_like: { decrement: 1 } }
      })

      return {
        message: 'Like removed',
        data: { liked: false }
      }
    }

    // LIKE
    const newLike = await prisma.like.create({
      data: {
        article_id,
        user_id,
        status: true
      }
    })

    await prisma.article.update({
      where: { id: article_id },
      data: { total_like: { increment: 1 } }
    })

    return {
      message: 'Like added',
      data: { liked: true, like: newLike }
    }
  }

  static async getUserLikes (user_id) {
    return await prisma.like.findMany({
      where: { user_id },
      include: { article: true }
    })
  }

  static async getLikeCount (articleId) {
    return await prisma.like.count({
      where: { article_id: parseInt(articleId) }
    })
  }

  static async getLikesByArticleId (articleId) {
    return await prisma.like.findMany({
      where: { article_id: parseInt(articleId) },
      include: { user: true }
    })
  }

  static async deleteLikeByArticleId (user_id, article_id) {
    const like = await prisma.like.findUnique({
      where: {
        article_id_user_id: {
          article_id: parseInt(article_id),
          user_id: parseInt(user_id)
        }
      }
    })

    if (!like) {
      return { message: 'Like not found', data: null }
    }

    await prisma.like.delete({
      where: {
        article_id_user_id: {
          article_id: parseInt(article_id),
          user_id: parseInt(user_id)
        }
      }
    })

    await prisma.article.update({
      where: { id: parseInt(article_id) },
      data: { total_like: { decrement: 1 } }
    })

    return { message: 'Like deleted', data: { deleted: true } }
  }

  static async getDashboardSummary (userId) {
    const [totalLikes, totalBookmarks, totalArticles] = await Promise.all([
      prisma.like.count({
        where: { user_id: parseInt(userId), status: true }
      }),
      prisma.bookmark.count({
        where: { user_id: parseInt(userId), status: true }
      }),
      prisma.article.count({
        where: { user_id: parseInt(userId) }
      })
    ])

    return {
      totalLikes,
      totalBookmarks,
      totalArticles
    }
  }
}

module.exports = LikeRepository
