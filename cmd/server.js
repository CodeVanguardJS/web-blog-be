const app = require('../app')
const env = require('dotenv')

env.config()

const port = process.env.APP_PORT || 5000

app.listen(port, () => {
  console.log(`app running in port ${port}`)
})
