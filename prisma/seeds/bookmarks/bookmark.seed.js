const prisma = require('../../../libs/prisma')

const BOOKMARKS = [
  {
    id: 101,
    article_id: 101,
    user_id: 104,
    status: true
  },
  {
    id: 102,
    article_id: 104,
    user_id: 102,
    status: false
  },
  {
    id: 103,
    article_id: 105,
    user_id: 105,
    status: false
  }
]

const seedBookmarks = async () => {
  await prisma.bookmark.createMany({
    data: BOOKMARKS,
    skipDuplicates: true
  })
}

module.exports = seedBookmarks
