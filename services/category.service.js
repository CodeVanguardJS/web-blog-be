const CategoryRepository = require('../repositories/category.repository')

class CategoryService {
  static async getAll () {
    try {
      const category = await CategoryRepository.getAll()
      return category
    } catch (error) {
      console.log(error)
      throw error
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
      console.log(error)
      throw error
    }
  }

  static async update (req, res) {
    try {
      const category = await CategoryRepository.update(req, res)
      return res.status(200).json(category)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async delete (req, res) {
    try {
      const category = await CategoryRepository.delete(req, res)
      return res.status(200).json(category)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

module.exports = CategoryService
