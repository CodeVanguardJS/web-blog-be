const express = require('express')
const AuthController = require('../../controllers/auth.controller')
const router = express.Router()

router.get('/:id', AuthController.getUserById)

module.exports = router
