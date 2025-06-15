const prisma = require('../libs/prisma')

class AuthRepository {
  static async findByEmail (email) {
    return prisma.user.findUnique({ where: { email } })
  }

  static async findById (id) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        photo_url: true,
        createdAt: true
      }
    })
  }

  static async create (data) {
    return prisma.user.create({
      data: {
        ...data,
        photo_url: data.photo_url || null
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })
  }

  static async update (id, data) {
    return prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        photo_url: true,
        createdAt: true
      }
    })
  }
}

module.exports = AuthRepository
