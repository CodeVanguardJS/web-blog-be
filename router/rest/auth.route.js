const express = require('express')
const AuthController = require('../../controllers/auth.controller')
const authMiddleware = require('../../middlewares/authMiddleware')
const upload = require('../../middlewares/multer')

const router = express.Router()

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.get('/me', authMiddleware, AuthController.getProfile)
router.put('/me', authMiddleware, upload.single('photo'), AuthController.updateProfile)
router.get('/dashboard', authMiddleware, AuthController.getDashboardSummary)

module.exports = router
