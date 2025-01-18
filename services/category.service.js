const CategoryRepository = require('../repositories/category.repository')

class CategoryService {
  static async getAll () {
    try {
      const category = await CategoryRepository.getAll()
      return category
    } catch (error) {
      const err = new Error('Internal Server Error')
      err.statusCode = 500
      throw err
    }
  }

  static findName = async (name) => {
    try {
      if (!name) {
        const error = new Error('Category name is required')
        error.name = 'BadRequest'
        throw error
      }

      const isCategoryExist = await CategoryRepository.findName(name)

      if (isCategoryExist) {
        console.log(isCategoryExist)
        const error = new Error('Category already exist')
        error.name = 'Conflict'
        throw error
      }

      const category = await CategoryRepository.create(name)
      return category
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async create (name) {
    try {
      const category = await CategoryRepository.create(name)
      return category
    } catch (error) {
      if (error.code === 'P2002') {
        const err = new Error('Category already exist')
        err.statusCode = 409
        throw err
      }
      throw error
    }
  }

  static async update (id, data) {
    try {
      const category = await CategoryRepository.update(+id, data)
      return category
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async delete (id) {
    try {
      const category = await CategoryRepository.delete(+id)
      console.log(category)
      return category
    } catch (error) {
      console.log(error)
      const err = new Error('Internal Server Error')
      err.statusCode = 500
      throw err
    }
  }
}

module.exports = CategoryService
