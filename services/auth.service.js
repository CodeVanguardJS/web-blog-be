const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AuthRepository = require('../repositories/auth.repository')

class AuthService {
  static async register (name, email, password) {
    const existingUser = await AuthRepository.findByEmail(email)
    if (existingUser) {
      throw new Error('Email already registered')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await AuthRepository.create({
      name,
      email,
      password: hashedPassword
    })

    return { id: user.id, name: user.name, email: user.email }
  }

  static async login (email, password) {
    const user = await AuthRepository.findByEmail(email)
    if (!user) {
      throw new Error('User not found')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new Error('Invalid password')
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })

    return { token }
  }

  static async getProfile (id) {
    const user = await AuthRepository.findById(id)
    if (!user) {
      throw new Error('User not found')
    }

    return user
  }

  static async updateProfile (id, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10)
    }

    return AuthRepository.update(id, data)
  }
}

module.exports = AuthService
