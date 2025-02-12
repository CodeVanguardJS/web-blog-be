const prisma = require('../libs/prisma')

class RecipeRepository {
  static async getAll () {
    try {
      const category = await prisma.recipe.findMany()
      return category
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async getById (id) {
    try {
      const recipe = await prisma.recipe.findUnique({ where: { id } })
      return recipe
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async update (id, data) {
    try {
      const recipe = await prisma.recipe.update({ where: { id }, data })
      return recipe
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async delete (id) {
    try {
      const recipe = await prisma.recipe.delete({ where: { id } })
      console.log(recipe)
      return recipe
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  //   static async getById(id) {
  //     try {
  //       const category = await prisma.category.findUnique({ where: { id } })
  //       return category
  //     } catch (error) {
  //       console.log(error)
  //       throw error
  //     }
  //   }

  //   static async findName(params) {
  //     try {
  //       const findName = await prisma.category.findFirst({ where: { name: params } })
  //       return findName
  //     } catch (error) {
  //       console.log(error)
  //       throw error
  //     }
  //   }

  static create = async (params) => {
    try {
      const category = await prisma.category.create({ data: { name: params } })
      return category
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static createMany = async (params) => {
    try {
      console.log('params:', params)
      const recipes = await prisma.recipe.createMany({
        data: params,
        skipDuplicates: true
      })
      return recipes
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  //   static async update(id, data) {
  //     try {
  //       const category = await prisma.category.update({ where: { id }, data })
  //       return category
  //     } catch (error) {
  //       console.log(error)
  //       throw error
  //     }
  //   }

  //   static async delete(id) {
  //     try {
  //       const category = await prisma.category.delete({ where: { id } })
  //       console.log(category)
  //       return category
  //     } catch (error) {
  //       console.log(error)
  //       throw error
  //     }
  //   }
}

module.exports = RecipeRepository
