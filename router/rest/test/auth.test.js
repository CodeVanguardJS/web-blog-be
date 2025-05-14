const app = require('../../../app')
const request = require('supertest')
const prisma = require('../../../libs/prisma')

const BASE_URL = '/api/v1/auth'

afterAll(async () => {
  await prisma.user.deleteMany({ where: { email: 'testuser@example.com' } })
  await prisma.$disconnect()
})

describe('Auth Routes', () => {
  let token = ''

  test('Register new user', async () => {
    const res = await request(app).post(`${BASE_URL}/register`).send({
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123'
    })

    expect(res.statusCode).toBe(201)
    expect(res.body.status).toBe(true)
    expect(res.body.message).toBe('User registered successfully')
  })

  test('Login user', async () => {
    const res = await request(app).post(`${BASE_URL}/login`).send({
      email: 'testuser@example.com',
      password: 'password123'
    })

    expect(res.statusCode).toBe(200)
    expect(res.body.status).toBe(true)
    expect(res.body.data).toHaveProperty('token')

    token = res.body.data.token
  })

  test('Get profile (auth/me)', async () => {
    const res = await request(app)
      .get(`${BASE_URL}/me`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200)
    expect(res.body.status).toBe(true)
    expect(res.body.data).toHaveProperty('email', 'testuser@example.com')
    expect(res.body.data).not.toHaveProperty('password')
  })
})
