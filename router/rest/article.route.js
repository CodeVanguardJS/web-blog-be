const express = require('express')
const ArticleController = require('../../controllers/article.controller')
const upload = require('../../middlewares/multer')
const authMiddleware = require('../../middlewares/authMiddleware')
const router = express.Router()

router.get('/', ArticleController.getAll)
router.get('/user/:id', ArticleController.getByUserId)
router.get('/me', authMiddleware, ArticleController.getByMe)
router.get('/category/:id', ArticleController.getByCategory)
router.post('/', authMiddleware, upload.single('photo'), ArticleController.create)
router.get('/:id', ArticleController.getById)
router.put('/:id', authMiddleware, upload.single('photo'), ArticleController.update)
router.delete('/:id', authMiddleware, ArticleController.delete)
router.post('/upload', upload.single('image'), ArticleController.upload)

module.exports = router
