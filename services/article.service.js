const cloudinaryUpload = require('../libs/cloudinary')
const ArticleRepository = require('../repositories/article.repository')
const CategoryRepository = require('../repositories/category.repository')

class ArticleService {
  static async getByCategory (id) {
    try {
      const isCategoryExist = await CategoryRepository.getById(+id)
      if (!isCategoryExist) {
        const error = new Error('Category not found.')
        error.name = 'ErrorNotFound'
        throw error
      }
      const article = await ArticleRepository.getByCategory(+id)
      return article
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async getAll (params) {
    try {
      let { page, limit, search } = params

      page = parseInt(page) || 1
      limit = parseInt(limit) || 10

      const filterOptions = {}
      let searchFilter = {}

      if (search) {
        searchFilter = {
          title: {
            contains: search,
            mode: 'insensitive'
          }
        }
      }

      filterOptions.where = {
        ...searchFilter
      }

      const startIndex = (page - 1) * limit

      filterOptions.take = limit
      filterOptions.skip = startIndex

      if (page < 1 || limit < 1) {
        const error = new Error('Page and limit must bigger than 0.')
        error.name = 'ErrorNotFound'
        throw error
      }
      const userAuthId = 102
      const article = await ArticleRepository.getAll(filterOptions)

      const dataArticle = article.map((item) => {
        // search bookmark from userAuthId
        let isBookmark = false
        const bookmarkItem = item.bookmark.find(
          (bookmark) => bookmark.user_id === userAuthId && bookmark.status === true
        )
        if (bookmarkItem) {
          isBookmark = true
        }

        return {
          id: item.id,
          title: item.title,
          total_like: item.total_like,
          category_id: item.category_id,
          user_id: item.user_id,
          photo_url: item.photo_url,
          description: item.description,
          category: item.category,
          user: item.user,
          is_bookmark: isBookmark,
          bookmark: item.bookmark
        }
      })

      const totalArticle = await ArticleRepository.getTotalArticle(filterOptions.where)
      console.log(totalArticle)
      const totalPage = Math.ceil(totalArticle / limit)

      const categoryResp = {
        data: dataArticle,
        currentPage: page,
        totalPage,
        totalData: article.length
      }
      return categoryResp
    } catch (error) {
      const err = new Error('Internal Server Error')
      err.statusCode = 500
      throw err
    }
  }

  static async getById (id) {
    try {
      const userAuthId = 104
      const article = await ArticleRepository.getById(+id)

      let isBookmark = false
      const bookmarkItem = article.bookmark.find(
        (bookmark) => bookmark.user_id === userAuthId && bookmark.status === true
      )
      if (bookmarkItem) {
        isBookmark = true
      }

      let isLike = false
      const likeItem = article.like.find(
        (like) => like.user_id === userAuthId && like.status === true
      )
      if (likeItem) {
        isLike = true
      }

      const dataArticle = {
        id: article.id,
        title: article.title,
        total_like: article.total_like,
        category_id: article.category_id,
        user_id: article.user_id,
        photo_url: article.photo_url,
        description: article.description,
        category: article.category,
        user: article.user,
        recipes: article.recipe,
        is_bookmark: isBookmark,
        is_like: isLike
      }
      return dataArticle
    } catch (error) {
      const err = new Error('Internal Server Error')
      err.statusCode = 500
      throw err
    }
  }

  //   static findName = async (name) => {
  //     try {
  //       if (!name) {
  //         const error = new Error('Category name is required')
  //         error.name = 'BadRequest'
  //         throw error
  //       }

  //       const isCategoryExist = await CategoryRepository.findName(name)

  //       if (isCategoryExist) {
  //         console.log(isCategoryExist)
  //         const error = new Error('Category already exist')
  //         error.name = 'Conflict'
  //         throw error
  //       }

  //       const category = await CategoryRepository.create(name)
  //       return category
  //     } catch (error) {
  //       console.log(error)
  //       throw error
  //     }
  //   }

  static async create (body, photo) {
    try {
      const userAuthId = 104
      const { title, categoryId, description, recipes } = body
      console.log(categoryId)
      const photoUpload = await cloudinaryUpload(photo)

      const recipeData = []

      for (let i = 0; i < recipes.length; i++) {
        recipeData.push({
          content: recipes[i]
        })
      }

      const data = {
        title,
        description,
        photo_url: photoUpload.secure_url,
        total_like: 0,
        user: {
          connect: {
            id: userAuthId
          }
        },
        category: {
          connect: {
            id: +categoryId
          }
        },
        recipe: {
          create: recipeData
        }
      }
      console.log(`data: ${data.category.connect.id}`)

      const article = await ArticleRepository.create(data)
      console.log(`recipes: ${recipes}`)

      return article
    } catch (error) {
      if (error.code === 'P2002') {
        const err = new Error('Category already exist')
        err.statusCode = 409
        throw err
      }
      throw error
    }
  }

  static async update (id, data, photo) {
    try {
      const isArticleExist = await ArticleRepository.getById(+id)
      if (!isArticleExist) {
        const error = new Error('Article not found')
        error.name = 'NotFound'
        error.statusCode = 404
        throw error
      }
      const photoUpload = await cloudinaryUpload(photo)
      data.photo_url = photoUpload.secure_url
      const recipe = await ArticleRepository.update(+id, data)
      return recipe
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async delete (id) {
    try {
      const isArticleExist = await ArticleRepository.getById(+id)
      if (!isArticleExist) {
        const error = new Error('Article not found')
        error.name = 'NotFound'
        error.statusCode = 404
        throw error
      }
      const article = await ArticleRepository.delete(+id)
      console.log(article)
      return article
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

module.exports = ArticleService
