const app = require('../../../app')
const request = require('supertest')
const prisma = require('../../../libs/prisma')
const { hashPassword } = require('../../../libs/bcrypt')

const path = require('path')

const BASE_URL = '/api/v1/articles'

const fs = require('fs')

beforeAll(async () => {
  try {
    // Insert data ke tabel Todos
    await prisma.category.createMany({
      data: [
        { id: 1001, name: 'AAA' },
        { id: 1002, name: 'BBB' }
      ]
    })

    await prisma.user.createMany({
      data: [
        {
          id: 1001,
          name: 'user1',
          email: 'user1@example.com',
          password: hashPassword('12345678', 10)
        },
        {
          id: 1002,
          name: 'user2',
          email: 'user2@example.com',
          password: hashPassword('12345678', 10)
        }
      ]
    })

    await prisma.article.createMany({
      data: [
        {
          id: 1001,
          title: 'Article 1',
          description: 'Description 1',
          photo_url: 'https://example.com/image1.jpg',
          type: 'DRAFT',
          category_id: 1001,
          user_id: 1001
        },
        {
          id: 1002,
          title: 'Article 2',
          description: 'Description 2',
          photo_url: 'https://example.com/image2.jpg',
          type: 'PUBLISHED',
          category_id: 1002,
          user_id: 1001
        },
        {
          id: 1003,
          title: 'Article 3',
          description: 'Description 3',
          photo_url: 'https://example.com/image3.jpg',
          type: 'PUBLISHED',
          category_id: 1001,
          user_id: 1002
        }
      ]
    })
  } catch (error) {
    console.error(error)
  }
})

afterAll(async () => {
  try {
    await prisma.category.deleteMany({})
    await prisma.user.deleteMany({})
    await prisma.recipe.deleteMany({})
    await prisma.article.deleteMany({})
  } catch (error) {
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
})

describe('Article Routes', () => {
  test('Get all articles', async () => {
    const res = await request(app).get(`${BASE_URL}`)
    expect(res.statusCode).toBe(200)
    expect(res.body.status).toBe(true)
    expect(res.body.message).toBe('Success Get All Article')
    expect(res.body.data.data.length).toBe(3)
  })

  test('Get article by id', async () => {
    const res = await request(app).get(`${BASE_URL}/1001`)
    expect(res.statusCode).toBe(200)
    expect(res.body.status).toBe(true)
    expect(res.body.message).toBe('Success Get Article By Id')
    expect(res.body.data.id).toBe(1001)
  })

  test('Get article by category', async () => {
    const res = await request(app).get(`${BASE_URL}/category/1001`)
    expect(res.statusCode).toBe(200)
    expect(res.body.status).toBe(true)
    expect(res.body.message).toBe('Success Get Article By Category')
    expect(res.body.data.length).toBe(2)
  })
})

describe('Article Routes with login', () => {
  let TOKEN = ''
  test('Get all articles by me', async () => {
    const resLogin = await request(app).post('/api/v1/auth/login').send({
      email: 'user1@example.com',
      password: '12345678'
    })

    expect(resLogin.statusCode).toBe(200)
    expect(resLogin.body.status).toBe(true)
    TOKEN = resLogin.body.data.token

    const res = await request(app).get(`${BASE_URL}/me`).set('Authorization', `Bearer ${TOKEN}`)
    expect(res.statusCode).toBe(200)
    expect(res.body.status).toBe(true)
    expect(res.body.message).toBe('Success Get Article By User')
    expect(res.body.data.data.length).toBe(2)
    console.log('File exists:', fs.existsSync(path.resolve(__dirname, './assets/sample.png')))
  })
})
