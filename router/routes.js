const express = require('express')
const router = express.Router()

router.get('/api/hello', function (req, res) {
  res.status(200).json({ message: 'hello world' })
})

router.use('/api/auth', require('./auth.route'))

module.exports = router
