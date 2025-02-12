const prisma = require('../../libs/prisma')
const dotenv = require('dotenv')
const seedCategories = require('./categories/category.seed')
const seedUsers = require('./users/user.seed')
const seedArticles = require('./articles/article.seed')
const seedRecipes = require('./recipes/recipe.seed')
const seedLikes = require('./likes/like.seed')
const seedBookmarks = require('./bookmarks/bookmark.seed')

const environment = process.env.NODE_ENV || 'development'
dotenv.config({ path: `.env.${environment}` })

async function main () {
  // await prisma.category.deleteMany()
  // await prisma.user.deleteMany()
  // await prisma.article.deleteMany()
  // await prisma.recipe.deleteMany()
  // await prisma.like.deleteMany()
  // await prisma.bookmark.deleteMany()
  await seedCategories()
  await seedUsers()
  await seedArticles()
  await seedRecipes()
  await seedLikes()
  await seedBookmarks()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
