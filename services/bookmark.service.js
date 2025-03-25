const prisma = require('../libs/prisma')

class BookmarkService {
  static async toggleBookmark (userId, articleId) {
    const existingBookmark = await prisma.bookmark.findFirst({
      where: { userId, articleId }
    })

    if (existingBookmark) {
      await prisma.bookmark.delete({
        where: { id: existingBookmark.id }
      })

      return { message: 'Bookmark removed', data: null }
    }

    const newBookmark = await prisma.bookmark.create({
      data: { userId, articleId }
    })

    return { message: 'Bookmark added', data: newBookmark }
  }

  static async getUserBookmarks (userId) {
    return prisma.bookmark.findMany({
      where: { userId },
      include: {
        article: true
      }
    })
  }
}

module.exports = BookmarkService
