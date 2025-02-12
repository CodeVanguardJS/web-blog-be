const prisma = require('../../../libs/prisma')

const USER = [
  {
    id: 101,
    name: 'Pierrette Yushkov',
    email: 'pierrette.yushkov@example.com',
    photo_url:
      'https://assets.ajio.com/medias/sys_master/root/20240612/4Ydg/666b2b216f60443f311d230d/-473Wx593H-700076737-blue-MODEL.jpg',
    password: '$2a$04$LNd4s12z6d7hxIRgqVMuAusqSxXeTqtqrX4Rmjb/trkO8oPExSkBO' // all password = 12345678
  },
  {
    id: 102,
    name: 'Pierce Tarrier',
    email: 'pierce.tarrier@example.com',
    photo_url:
      'https://assets.ajio.com/medias/sys_master/root/20240612/4Ydg/666b2b216f60443f311d230d/-473Wx593H-700076737-blue-MODEL.jpg',
    password: '$2a$04$u8jg/UD9Qcde9awwS4LmbOLz0gWcAH01llGSB9kpSJyC0OhtlRgny'
  },
  {
    id: 103,
    name: 'Idalia Scimonelli',
    email: 'idalia.scimonelli@example.com',
    photo_url:
      'https://assets.ajio.com/medias/sys_master/root/20240612/4Ydg/666b2b216f60443f311d230d/-473Wx593H-700076737-blue-MODEL.jpg',
    password: '$2a$04$VnqylA4ILzIxSTQrgTZtv.8feFQIqhtXNDLzPobAHVVj2SOuJZ0Iq'
  },
  {
    id: 104,
    name: 'Krishnah Norway',
    email: 'krishnah.norway@example.com',
    photo_url:
      'https://assets.ajio.com/medias/sys_master/root/20240612/4Ydg/666b2b216f60443f311d230d/-473Wx593H-700076737-blue-MODEL.jpg',
    password: '$2a$04$g7Qi50Ql4KAjRTWZqmN41urOLGUcWsh2BDjS08CvAcvIlBvHQZHtG'
  },
  {
    id: 105,
    name: 'Farly Germain',
    email: 'farly.germain@example.com',
    photo_url:
      'https://assets.ajio.com/medias/sys_master/root/20240612/4Ydg/666b2b216f60443f311d230d/-473Wx593H-700076737-blue-MODEL.jpg',
    password: '$2a$04$BHhD3aY2tMEqqbVPRCA6Jenusgv3zBJ/jPpP2WUxSbCoPnYZ8kYpe'
  }
]

const seedUsers = async () => {
  await prisma.user.createMany({
    data: USER,
    skipDuplicates: true
  })
}

module.exports = seedUsers
