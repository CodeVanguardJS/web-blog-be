const { successResponse } = require('../helpers/response')
const cloudinaryUpload = require('../libs/cloudinary')
const AuthService = require('../services/auth.service')
const errorResponse = require('../middlewares/errorHandler')
const DashboardRepository = require('../repositories/dashboard.repository')
const fs = require('fs')

class AuthController {
  static async register (req, res, next) {
    try {
      const { name, email, password } = req.body
      const user = await AuthService.register(name, email, password)
      return successResponse(res, user, 'User registered successfully', 201)
    } catch (error) {
      next(error)
    }
  }

  static async login (req, res, next) {
    try {
      const { email, password } = req.body
      const data = await AuthService.login(email, password)
      return successResponse(res, data, 'Login successful')
    } catch (error) {
      next(error)
    }
  }

  static async getProfile (req, res, next) {
    try {
      const user = await AuthService.getProfile(req.user.id)
      return successResponse(res, user, 'Profile retrieved successfully')
    } catch (error) {
      next(error)
    }
  }

  static async updateProfile (req, res, next) {
    try {
      const { name, email, password } = req.body
      const updateData = { name, email }

      if (req.file) {
        const result = await cloudinaryUpload(req.file.path)
        updateData.photo_url = result.secure_url
        fs.unlinkSync(req.file.path)
      }

      if (password) {
        updateData.password = password
      }

      const updatedUser = await AuthService.updateProfile(req.user.id, updateData)
      return successResponse(res, updatedUser, 'Profile updated successfully')
    } catch (error) {
      next(error)
    }
  }

  static async getDashboardSummary (req, res) {
    try {
      const userId = req.user.id
      console.log('USER ID:', userId)

      const summary = await DashboardRepository.getDashboardSummary(userId)
      console.log('SUMMARY:', summary)

      return successResponse(res, summary)
    } catch (error) {
      console.error('DASHBOARD ERROR:', error)
      return errorResponse(res, 'Internal server error', [error.message], 500)

  static async getUserById (req, res, next) {
    try {
      const { id } = req.params
      const user = await AuthService.getProfile(Number(id))
      return successResponse(res, user, 'User profile retrieved successfully')
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AuthController
