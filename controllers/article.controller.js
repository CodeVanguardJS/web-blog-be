const { successResponse } = require('../helpers/response')
const cloudinaryUpload = require('../libs/cloudinary')
const ArticleService = require('../services/article.service')

class ArticleController {
  static async getAll (req, res, next) {
    try {
      const category = await ArticleService.getAll(req.query)
      return successResponse(res, category, 'Success Get All Article')
    } catch (error) {
      next(error)
    }
  }

  static async getByCategory (req, res, next) {
    try {
      const { id } = req.params
      const category = await ArticleService.getByCategory(id)
      return successResponse(res, category, 'Success Get Category By Id')
    } catch (error) {
      next(error)
    }
  }

  static async getById (req, res, next) {
    try {
      const { id } = req.params
      const article = await ArticleService.getById(id)
      return successResponse(res, article, 'Success Get Category By Id')
    } catch (error) {
      next(error)
    }
  }

  static create = async (req, res, next) => {
    try {
      const { title, categoryId, description, recipes } = req.body
      const photo = req.file.path
      if (!title || !categoryId || !description || !recipes || !photo) {
        const error = new Error('field  is required')
        error.name = 'BadRequest'
        throw error
      }
      const body = { title, categoryId, description, recipes }
      const article = await ArticleService.create(body, photo)

      return successResponse(res, article, 'Success Post Article', 201)
    } catch (error) {
      next(error)
    }
  }

  static async update (req, res, next) {
    try {
      const { title, categoryId, description } = req.body
      const { id } = req.params
      const photo = req.file.path

      if (!title || !categoryId || !description || !photo) {
        const error = new Error('field  is required')
        error.name = 'BadRequest'
        throw error
      }

      const body = { title, category_id: +categoryId, description }
      const article = await ArticleService.update(id, body, photo)
      return successResponse(res, article, 'Success Put Article')
    } catch (error) {
      next(error)
    }
  }

  static async delete (req, res, next) {
    try {
      const { id } = req.params
      const article = await ArticleService.delete(id)
      return successResponse(res, article, 'Success Delete Article')
    } catch (error) {
      next(error)
    }
  }

  static async upload (req, res) {
    try {
      const result = await cloudinaryUpload(req.file.path)
      res.status(200).json({
        success: true,
        message: 'Uploaded!',
        url: result.secure_url
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: 'Error'
      })
    }
  }
}

module.exports = ArticleController
