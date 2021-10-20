const { User } = require('../models')
const { jikan, mangadex, youtube } = require('../apis/axios')
const MangadexGeneralParser = require('../helpers/mangadexParser')

module.exports = class Controller {
  static async getAnimes(req, res, next) {
    try {
      const { title, page, limit } = req.query
      const response = await jikan({
        url: '/search/anime',
        method: 'get',
        params: {
          q: title,
          page: page,
          limit: limit || 10
        }
      })
      res.status(200).json(response.data?.results)
    } catch (err) {
      next(err)
    }
  }
  static async getMangas(req, res, next) {
    try {
      let { title } = req.query
      title = title.includes(' ') ? title.replace(' ', '%20') : title
      const response = await mangadex({
        url: `/manga?limit=32&offset=0&includes[]=cover_art&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&title=${title}&order[relevance]=desc`,
        method: 'get'
      })
      const data = response.data.data.map(e => {
        const parser = new MangadexGeneralParser(e)
        return {
          id: parser.id,
          title: parser.title,
          description: parser.description,
          tags: parser.tags,
          status: parser.status,
          state: parser.state,
          thumbnail: parser.thumbnail
        }
      })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }
  static async getAnimeById(req, res, next) {
    try {
      const { id, page } = req.query
      const response = await jikan({
        url: `/anime/${id}/episodes/${page}`
      })
      res.status(200).json(response.data.episodes)
    } catch (err) {
      next(err)
    }
  }
  static async getMangaAuthor(req, res, next) {
    try {
      const { id } = req.params
      const response = await mangadex({
        url: `/manga/${id}?includes[]=author`
      })
      const author = response.data.data.relationships.map(e => {
        if (e.type === 'author') {
          return e.attributes.name
        }
      }).filter(e => e)
      res.status(200).json(author[0])
    } catch (err) {
      next(err)
    }
  }
}