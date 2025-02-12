const { successResponse } = require('../helpers/response')
const RecipeService = require('../services/recipe.service')

class RecipeController {
  static async getAll (req, res, next) {
    try {
      const recipe = await RecipeService.getAll(req, res)
      return successResponse(res, recipe, 'Success Get All Categories')
    } catch (error) {
      next(error)
    }
  }

  static async createByArticle (req, res, next) {
    try {
      const { id } = req.params
      const recipe = await RecipeService.createByArticle(id, req.body)
      return successResponse(res, recipe, 'Success Post Category', 201)
    } catch (error) {
      next(error)
    }
  }

  static async update (req, res, next) {
    try {
      const { id } = req.params
      const recipe = await RecipeService.update(id, req.body)
      return successResponse(res, recipe, 'Success Put Category')
    } catch (error) {
      next(error)
    }
  }

  static async delete (req, res, next) {
    try {
      const { id } = req.params
      const recipe = await RecipeService.delete(id)
      return successResponse(res, recipe, 'Success Delete Category')
    } catch (error) {
      next(error)
    }
  }
}

module.exports = RecipeController
