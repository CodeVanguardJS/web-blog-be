/* eslint-disable camelcase */
const { successResponse } = require('../helpers/response')
const AuthService = require('../services/auth.service')

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
      const photo_url = req.file ? req.file.path : null

      const updateData = { name, email }
      if (password) updateData.password = password
      if (photo_url) updateData.photo_url = photo_url

      const updatedUser = await AuthService.updateProfile(req.user.id, updateData)
      return successResponse(res, updatedUser, 'Profile updated successfully')
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AuthController
