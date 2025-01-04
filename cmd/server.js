const app = require('../app')
const dotenv = require('dotenv')

const environment = process.env.NODE_ENV || 'development'
dotenv.config({ path: `.env.${environment}` })

const port = process.env.APP_PORT || 5000

app.listen(port, () => {
  console.log(`app running in port ${port}`)
})
