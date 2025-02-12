const express = require('express')
// const { default: RecipeController } = require('../../controllers/recipe.controller')
const RecipeController = require('../../controllers/recipe.controller')
// const CategoryController = require('../../controllers/category.controller')
const router = express.Router()

router.get('/', RecipeController.getAll)
// router.get('/:id', CategoryController.getById)
router.post('/articles/:id', RecipeController.createByArticle)
// router.put('/articles/:id', RecipeController.updateByArticle)
router.put('/:id', RecipeController.update)
router.delete('/:id', RecipeController.delete)

module.exports = router
