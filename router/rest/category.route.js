const express = require('express')
const CategoryController = require('../../controllers/category.controller')
const router = express.Router()

router.get('/', CategoryController.getAll)
router.post('/', CategoryController.create)
router.put('/:id', CategoryController.update)
router.delete('/:id', CategoryController.delete)

module.exports = router
