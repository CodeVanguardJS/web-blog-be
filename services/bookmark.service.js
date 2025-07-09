/* eslint-disable semi */
const prisma = require('../libs/prisma')

class BookmarkService {
  static async toggleBookmark (userId, articleId) {
    const existingBookmark = await prisma.bookmark.findUnique({
      where: {
        article_id_user_id: {
          article_id: Number(articleId),
          user_id: Number(userId)
        }
      }
    })

    if (existingBookmark) {
      await prisma.bookmark.delete({
        where: {
          article_id_user_id: {
            article_id: Number(articleId),
            user_id: Number(userId)
          }
        }
      })

      return {
        message: 'Bookmark removed',
        data: { bookmarked: false }
      }
    } else {
      const bookmark = await prisma.bookmark.create({
        data: {
          user_id: Number(userId),
          article_id: Number(articleId),
          status: true
        }
      })

      return {
        message: 'Bookmark added',
        data: {
          bookmarked: true,
          bookmark
        }
      }
    }
  }

  static async getUserBookmarks (userId) {
    return prisma.bookmark.findMany({
      where: { user_id: Number(userId), status: true },
      include: { article: true }
    })
  }
}

module.exports = BookmarkService
