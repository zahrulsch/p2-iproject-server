const axios = require('axios')

const jikan = axios.create({
  baseURL: 'https://api.jikan.moe/v3',
  timeout: 6000
})

const mangadex = axios.create({
  baseURL: 'https://api.mangadex.org',
  timeout: 6000
})

const youtube = axios.create({
  baseURL: ''
})

module.exports = { jikan, mangadex, youtube }