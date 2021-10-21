require('dotenv').config()
const cors = require('cors')
const Controller = require('./controllers/controller')
const express = require('express')
const errorHandler = require('./middlewares/errorHandler')
const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/animes', Controller.getAnimes)
app.get('/mangas', Controller.getMangas)
app.get('/anime', Controller.getAnimeById)
app.get('/anime-detail/:id', Controller.getAnimeDetail)
app.get('/manga-detail/:id', Controller.getMangaDetail)
app.get('/manga-chapters/:id', Controller.getMangaChapters)
app.get('/manga-chapter/:chapterId', Controller.getSingleChapters)

app.use(errorHandler)
app.listen(PORT, function () {
  console.log(`Running on 'http://localhost:${PORT}'`)
})