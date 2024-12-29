const express = require('express')
const app = express()
const router = require('./router/routes')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/v1', router)
app.use(errorHandler)

module.exports = app
