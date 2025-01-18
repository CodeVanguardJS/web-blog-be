const app = require('../../../app')
const request = require('supertest')
const prisma = require('../../../libs/prisma')

const BASE_URL = '/api/v1/categories'

beforeAll(async () => {
  try {
    // Insert data ke tabel Todos
    const category = await prisma.category.createMany({
      data: [
        { id: 1001, name: 'AAA' },
        { id: 1002, name: 'BBB' },
        { id: 1003, name: 'CCC' },
        { id: 1004, name: 'DDD' }
      ]
    })

    console.log(category)
  } catch (error) {
    console.error(error)
  }
})

afterAll(async () => {
  try {
    await prisma.category.deleteMany({})
  } catch (error) {
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
})

describe('GET List todo /api/v1/categories', () => {
  test('Get all data from list', async () => {
    const response = await request(app).get(BASE_URL).expect(200)

    expect(response.body.message).toBe('Success Get All Categories')
    console.log(response.body)
  })
})

describe('GET Detail todo /api/v1/categories/:id', () => {
  test('Get data by id', async () => {
    const response = await request(app)
      .get(BASE_URL + '/1001')
      .expect(200)

    expect(response.body.message).toBe('Success Get Category By Id')
  })
})

describe('POST Create todo /api/v1/categories', () => {
  test('Create new data', async () => {
    const response = await request(app).post(BASE_URL).send({ name: 'EEE' }).expect(201)

    expect(response.body.message).toBe('Success Post Category')
  })
})

describe('PUT Update todo /api/v1/categories/:id', () => {
  test('Update data', async () => {
    const response = await request(app)
      .put(BASE_URL + '/1001')
      .send({ name: 'FFF' })
      .expect(200)

    expect(response.body.message).toBe('Success Put Category')
  })
})

describe('DELETE Delete todo /api/v1/categories/:id', () => {
  test('Delete data', async () => {
    const response = await request(app)
      .delete(BASE_URL + '/1001')
      .expect(200)

    expect(response.body.message).toBe('Success Delete Category')
  })
})
