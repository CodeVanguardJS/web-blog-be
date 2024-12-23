const { successResponse } = require('../helpers/response')
const CategoryService = require('../services/category.service')

class CategoryController {
  static async getAll (req, res, next) {
    try {
      const category = await CategoryService.getAll(req, res)
      return successResponse(res, category, 'Success')
    } catch (error) {
      next(error)
    }
  }

  static create = async (req, res, next) => {
    try {
      const { name } = req.body
      if (!name) {
        const error = new Error('Category name is required')
        error.name = 'BadRequest'
        throw error
      }
      const category = await CategoryService.create(name)

      return successResponse(res, category, 'Success')
    } catch (error) {
      next(error)
    }
  }

  static async update (req, res) {
    try {
      const category = await CategoryService.update(req, res)
      return res.status(200).json(category)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async delete (req, res) {
    try {
      const category = await CategoryService.delete(req, res)
      return res.status(200).json(category)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

module.exports = CategoryController
