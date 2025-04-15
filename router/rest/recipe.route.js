const express = require('express')
const RecipeController = require('../../controllers/recipe.controller')
const authMiddleware = require('../../middlewares/authMiddleware')
const router = express.Router()

router.get('/', RecipeController.getAll)
// router.get('/:id', CategoryController.getById)
router.post('/articles/:id', authMiddleware, RecipeController.createByArticle)
router.put('/:id', authMiddleware, RecipeController.update)
router.delete('/:id', authMiddleware, RecipeController.delete)

module.exports = router
