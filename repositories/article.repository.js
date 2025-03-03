const prisma = require('../libs/prisma')

class ArticleRepository {
  static async getAll (filter) {
    try {
      const article = await prisma.article.findMany({
        ...filter,
        include: {
          bookmark: true,
          category: true,
          user: {
            select: {
              id: true,
              name: true,
              photo_url: true,
              email: true
            }
          }
        }
      })
      return article
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async getByCategory (id) {
    try {
      const article = await prisma.article.findMany({
        where: { category_id: id },
        include: {
          bookmark: true,
          category: true,
          user: {
            select: {
              id: true,
              name: true,
              photo_url: true,
              email: true
            }
          }
        }
      })
      return article
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async getTotalArticle (filter) {
    try {
      const article = await prisma.article.count({
        ...filter
      })
      return article
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async getById (id) {
    try {
      const article = await prisma.article.findUnique({
        where: { id },
        include: {
          recipe: true,
          like: true,
          bookmark: true,
          category: true,
          user: {
            select: {
              id: true,
              name: true,
              photo_url: true,
              email: true
            }
          }
        }
      })
      return article
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static create = async (params) => {
    try {
      const category = await prisma.article.create({ data: params, include: { recipe: true } })
      return category
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static update = async (id, params) => {
    try {
      const data = {
        title: params.title,
        description: params.description,
        photo_url: params.photo_url,
        category: {
          connect: {
            id: params.category_id
          }
        }
      }
      const category = await prisma.article.update({ where: { id }, data })
      return category
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static delete = async (id) => {
    try {
      const category = await prisma.article.delete({ where: { id } })
      return category
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

module.exports = ArticleRepository
