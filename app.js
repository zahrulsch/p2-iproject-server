require('dotenv').config()
const cors = require('cors')
const Controller = require('./controllers/controller')
const express = require('express')
const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(PORT, function () {
  console.log(`Running on 'http://localhost:${PORT}'`)
})