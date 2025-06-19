const jwt = require('jsonwebtoken')
const { errorResponse } = require('../helpers/response')

const authMiddleware = (req, res, next) => {
  // console.log('middleware auth')
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return errorResponse(res, 401, 'Unauthorized')
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return errorResponse(res, 401, 'Invalid or expired token')
  }
}

module.exports = authMiddleware
