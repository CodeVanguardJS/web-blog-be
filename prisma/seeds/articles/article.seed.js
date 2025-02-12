const prisma = require('../../../libs/prisma')

const ARTICLE = [
  {
    id: 101,
    title: 'Fried Fisher',
    total_like: 3,
    category_id: 109,
    user_id: 101,
    photo_url:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
    description: 'A delicious fried dish with fresh fish, seasoned and crispy.'
  },
  {
    id: 102,
    title: 'Hornbill Cake southern ground',
    total_like: 4,
    category_id: 107,
    user_id: 102,
    photo_url:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
    description: 'A rich and moist cake made with hornbill fruit from the southern ground.'
  },
  {
    id: 103,
    title: 'Moorhen Noodle purple',
    total_like: 3,
    category_id: 108,
    user_id: 103,
    photo_url:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
    description: 'A unique noodle dish served with flavorful Moorhen and a purple twist.'
  },
  {
    id: 104,
    title: 'Seal southern elephant',
    total_like: 2,
    category_id: 108,
    user_id: 104,
    photo_url:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
    description: 'A hearty dish inspired by southern elephant seals, rich in flavor and texture.'
  },
  {
    id: 105,
    title: 'Indian tree pie',
    total_like: 1,
    category_id: 106,
    user_id: 105,
    photo_url:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
    description: 'A savory pie made with ingredients native to India, featuring tree pie fruits.'
  }
]

const seedArticles = async () => {
  await prisma.article.createMany({
    data: ARTICLE,
    skipDuplicates: true
  })
}

module.exports = seedArticles
