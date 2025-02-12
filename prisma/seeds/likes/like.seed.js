const prisma = require('../../../libs/prisma')

const LIKES = [
  {
    id: 101,
    article_id: 101,
    user_id: 103,
    status: false
  },
  {
    id: 102,
    article_id: 104,
    user_id: 102,
    status: true
  },
  {
    id: 103,
    article_id: 101,
    user_id: 104,
    status: true
  },
  {
    id: 104,
    article_id: 103,
    user_id: 103,
    status: false
  },
  {
    id: 105,
    article_id: 103,
    user_id: 105,
    status: false
  },
  {
    id: 106,
    article_id: 101,
    user_id: 105,
    status: false
  },
  {
    id: 107,
    article_id: 105,
    user_id: 105,
    status: false
  },
  {
    id: 108,
    article_id: 102,
    user_id: 102,
    status: false
  },
  {
    id: 109,
    article_id: 103,
    user_id: 101,
    status: false
  },
  {
    id: 110,
    article_id: 102,
    user_id: 101,
    status: true
  },
  {
    id: 111,
    article_id: 102,
    user_id: 102,
    status: false
  },
  {
    id: 112,
    article_id: 104,
    user_id: 104,
    status: true
  },
  {
    id: 113,
    article_id: 102,
    user_id: 101,
    status: true
  }
]

const seedLikes = async () => {
  await prisma.like.createMany({
    data: LIKES,
    skipDuplicates: true
  })
}

module.exports = seedLikes
