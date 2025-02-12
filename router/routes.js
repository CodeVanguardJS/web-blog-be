const express = require('express')
const router = express.Router()
const authRoute = require('./rest/auth.route')
const categoryRoute = require('./rest/category.route')
const articleRoute = require('./rest/article.route')
const recipeRoute = require('./rest/recipe.route')

router.get('/api/hello', function (req, res) {
  res.status(200).json({ message: 'hello world' })
})

router.get('/api/health', function (req, res) {
  res.status(200).json({ message: 'successfully hit api server' })
})

router.use('/auth', authRoute)
router.use('/categories', categoryRoute)
router.use('/articles', articleRoute)
router.use('/recipes', recipeRoute)

module.exports = router
