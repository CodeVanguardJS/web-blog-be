/* eslint-disable semi */
const prisma = require('../libs/prisma')

class LikeService {
  static async toggleLike (userId, articleId) {
    const existingLike = await prisma.like.findUnique({
      where: {
        article_id_user_id: {
          article_id: articleId,
          user_id: userId
        }
      }
    })

    if (existingLike) {
      // UNLIKE: delete the like
      await prisma.like.delete({
        where: {
          article_id_user_id: {
            article_id: articleId,
            user_id: userId
          }
        }
      })

      await prisma.article.update({
        where: { id: articleId },
        data: { total_like: { decrement: 1 } }
      })

      return {
        message: 'Article unliked',
        data: { liked: false }
      }
    } else {
      // LIKE: create new like
      await prisma.like.create({
        data: {
          article_id: articleId,
          user_id: userId,
          status: true
        }
      })

      await prisma.article.update({
        where: { id: articleId },
        data: { total_like: { increment: 1 } }
      })

      return {
        message: 'Article liked',
        data: { liked: true }
      }
    }
  }

  static async getUserLikes (userId) {
    return await prisma.like.findMany({
      where: {
        user_id: userId,
        status: true
      },
      include: { article: true }
    })
  }

  static async getLikeCount (articleId) {
    return await prisma.like.count({
      where: { article_id: Number(articleId) }
    })
  }

static async getLikesByArticleId (articleId) {
  return await prisma.like.findMany({
    where: { article_id: Number(articleId) },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          photo_url: true,
          createdAt: true
        }
      }
    }
  })
}


  static async deleteLikeByArticleId (userId, articleId) {
    const like = await prisma.like.findUnique({
      where: {
        article_id_user_id: {
          article_id: Number(articleId),
          user_id: Number(userId)
        }
      }
    })

    if (!like) {
      return {
        message: 'Like not found',
        data: null
      }
    }

    await prisma.like.delete({
      where: {
        article_id_user_id: {
          article_id: Number(articleId),
          user_id: Number(userId)
        }
      }
    })

    await prisma.article.update({
      where: { id: Number(articleId) },
      data: { total_like: { decrement: 1 } }
    })

    return {
      message: 'Like deleted successfully',
      data: { deleted: true }
    }
  }
}

module.exports = LikeService
