const { successResponse } = require('../helpers/response')
const CategoryService = require('../services/category.service')

class CategoryController {
  static async getAll (req, res, next) {
    try {
      const category = await CategoryService.getAll(req, res)
      return successResponse(res, category, 'Success Get All Categories')
    } catch (error) {
      next(error)
    }
  }

  static async getById (req, res, next) {
    try {
      const { id } = req.params
      const category = await CategoryService.getById(id)
      return successResponse(res, category, 'Success Get Category By Id')
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

      return successResponse(res, category, 'Success Post Categories')
    } catch (error) {
      next(error)
    }
  }

  static async update (req, res) {
    try {
      const { id } = req.params
      const { name } = req.body
      if (!name) {
        const error = new Error('Category name is required')
        error.name = 'BadRequest'
        throw error
      }
      const category = await CategoryService.update(id, req.body)
      return successResponse(res, category, 'Success Update Category')
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async delete (req, res, next) {
    try {
      const { id } = req.params
      const category = await CategoryService.delete(id)
      return successResponse(res, category, 'Success Delete Category')
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CategoryController
