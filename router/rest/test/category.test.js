const app = require('../../../app')
const request = require('supertest')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const BASE_URL = '/api/v1/categories'

beforeAll(async () => {
  try {
    // Insert data ke tabel Todos
    await prisma.todo.createMany({
      data: [
        { id: 1001, name: 'AAA', createdAt: new Date(), updatedAt: new Date() },
        { id: 1002, name: 'BBB', createdAt: new Date(), updatedAt: new Date() },
        { id: 1003, name: 'CCC', createdAt: new Date(), updatedAt: new Date() },
        { id: 1004, name: 'DDD', createdAt: new Date(), updatedAt: new Date() }
      ]
    })
  } catch (error) {
    console.error(error)
  }
})

afterAll(async () => {
  try {
    await prisma.todo.deleteMany({})
  } catch (error) {
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
})

describe('GET List todo /api/v1/categories', () => {
  test('Get all data from list', async () => {
    const response = await request(app).get(BASE_URL).expect(200)

    // Assertions
    expect(response.body.message).toBe('Success')
  })
})
