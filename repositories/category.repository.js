const prisma = require('../libs/prisma')

class CategoryRepository {
  static async getAll () {
    try {
      const category = await prisma.category.findMany()
      return category
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async findName (params) {
    try {
      const findName = await prisma.category.findFirst({ where: { name: params } })
      return findName
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static create = async (params) => {
    try {
      const category = await prisma.category.create({ data: { name: params } })
      return category
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async update (req, res) {
    return []
  }

  static async delete (req, res) {
    return []
  }
}

module.exports = CategoryRepository
