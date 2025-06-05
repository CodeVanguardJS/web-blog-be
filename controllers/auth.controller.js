/* eslint-disable camelcase */
const { successResponse } = require('../helpers/response')
const cloudinaryUpload = require('../libs/cloudinary')
const AuthService = require('../services/auth.service')
const fs = require('fs') // Tambahkan untuk hapus file lokal

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

      // Jika user upload file, proses upload ke Cloudinary
      if (req.file) {
        const result = await cloudinaryUpload(req.file.path)
        updateData.photo_url = result.secure_url

        // Hapus file dari penyimpanan lokal setelah upload ke Cloudinary
        fs.unlinkSync(req.file.path)
      }

      // Jika user mengganti password, sertakan
      if (password) {
        updateData.password = password
      }

      console.log(`data controller: ${JSON.stringify(updateData)}`)

      const updatedUser = await AuthService.updateProfile(req.user.id, updateData)
      return successResponse(res, updatedUser, 'Profile updated successfully')
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AuthController
