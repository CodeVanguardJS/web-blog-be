const prisma = require('../../../libs/prisma')

const CATEGORIES = [
  {
    id: 101,
    name: 'Breakfast'
  },
  {
    id: 102,
    name: 'Lunch'
  },
  {
    id: 103,
    name: 'Dinner'
  },
  {
    id: 104,
    name: 'Snacks'
  },
  {
    id: 105,
    name: 'Appetizers'
  },
  {
    id: 106,
    name: 'Desserts'
  },
  {
    id: 107,
    name: 'Salads'
  },
  {
    id: 108,
    name: 'Beverages'
  },
  {
    id: 109,
    name: 'Soups'
  },
  {
    id: 110,
    name: 'Healthy Meals'
  }
]

const seedCategories = async () => {
  await prisma.category.createMany({
    data: CATEGORIES,
    skipDuplicates: true
  })
}

module.exports = seedCategories
