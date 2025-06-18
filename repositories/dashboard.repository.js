const prisma = require('../libs/prisma')

class DashboardRepository {
  static async getDashboardSummary (userId) {
    const [totalLikes, totalBookmarks, totalArticles] = await Promise.all([
      prisma.like.count({
        where: { user_id: Number(userId), status: true }
      }),
      prisma.bookmark.count({
        where: { user_id: Number(userId), status: true }
      }),
      prisma.article.count({
        where: { user_id: Number(userId) }
      })
    ])

    return {
      totalLikes,
      totalBookmarks,
      totalArticles
    }
  }
}

module.exports = DashboardRepository
