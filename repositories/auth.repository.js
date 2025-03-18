const prisma = require('../libs/prisma')

class AuthRepository {
  static async findByEmail (email) {
    return prisma.user.findUnique({ where: { email } })
  }

  static async findById (id) {
    return prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, photo_url: true }
    })
  }

  static async create (data) {
    return prisma.user.create({
      data: {
        ...data,
        photo_url: data.photo_url || null
      }
    })
  }

  static async update (id, data) {
    console.log(`id: ${id}, data: ${data}`)
    return prisma.user.update({
      where: { id },
      data
    })
  }
}

module.exports = AuthRepository
