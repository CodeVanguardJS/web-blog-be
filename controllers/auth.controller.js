class AuthController {
  static async login(req, res) {
    res.status(200).json({ message: 'success login' })
  }

  static async register(req, res) {
    res.status(200).json({ message: 'success register' })
  }
}

module.exports = AuthController
