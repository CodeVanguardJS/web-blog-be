const express = require('express')
const ArticleController = require('../../controllers/article.controller')
const upload = require('../../middlewares/multer')
const router = express.Router()

router.get('/', ArticleController.getAll)
router.post('/', upload.single('photo'), ArticleController.create)
router.get('/:id', ArticleController.getById)
router.put('/:id', upload.single('photo'), ArticleController.update)
router.delete('/:id', ArticleController.delete)
router.post('/upload', upload.single('image'), ArticleController.upload)

module.exports = router
