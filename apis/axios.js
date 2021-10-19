const axios = require('axios')

const jikan = axios.create({
  baseURL: 'https://api.jikan.moe/v3'
})

const mangadex = axios.create({
  baseURL: 'https://api.mangadex.org/manga'
})

const youtube = axios.create({
  baseURL: ''
})

module.exports = { jikan, mangadex, youtube }