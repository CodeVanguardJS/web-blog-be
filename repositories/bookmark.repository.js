/* eslint-disable semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class BookmarkRepository {
  static async createBookmark (user_id, article_id) {
    return await prisma.bookmark.create({
      data: {
        user_id,
        article_id,
        status: true
      }
    })
  }

  static async checkBookmark (user_id, article_id) {
    return await prisma.bookmark.findUnique({
      where: {
        article_id_user_id: {
          article_id,
          user_id
        }
      }
    })
  }

  static async getUserBookmarks (user_id) {
    return await prisma.bookmark.findMany({
      where: { user_id },
      include: {
        article: true
      }
    })
  }

  static async deleteBookmark (user_id, article_id) {
    return await prisma.bookmark.delete({
      where: {
        article_id_user_id: { user_id, article_id }
      }
    });
  }
}

module.exports = BookmarkRepository
