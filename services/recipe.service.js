const RecipeRepository = require('../repositories/recipe.repository')

class RecipeService {
  static async getAll () {
    try {
      const category = await RecipeRepository.getAll()
      return category
    } catch (error) {
      const err = new Error('Internal Server Error')
      err.statusCode = 500
      throw err
    }
  }

  static async createByArticle (idArticle, body) {
    try {
      const data = []
      for (let i = 0; i < body.data.length; i++) {
        const dataItem = {
          article_id: +idArticle,
          content: body.data[i].content
        }
        data.push(dataItem)
      }
      const recipe = await RecipeRepository.createMany(data)
      return recipe
    } catch (error) {
      const err = new Error('Internal Server Error')
      err.statusCode = 500
      throw err
    }
  }

  static async update (id, data) {
    try {
      const isRecipeExist = await RecipeRepository.getById(+id)
      if (!isRecipeExist) {
        const err = new Error('Recipe not found')
        err.name = 'NotFound'
        err.statusCode = 404
        throw err
      }
      const recipe = await RecipeRepository.update(+id, data)
      return recipe
    } catch (error) {
      const err = new Error('Internal Server Error')
      err.statusCode = 500
      throw err
    }
  }

  static async delete (id) {
    try {
      const isRecipeExist = await RecipeRepository.getById(+id)
      if (!isRecipeExist) {
        const err = new Error('Recipe not found')
        err.name = 'NotFound'
        err.statusCode = 404
        throw err
      }
      const recipe = await RecipeRepository.delete(+id)
      return recipe
    } catch (error) {
      const err = new Error('Internal Server Error')
      err.statusCode = 500
      throw err
    }
  }
}

module.exports = RecipeService
