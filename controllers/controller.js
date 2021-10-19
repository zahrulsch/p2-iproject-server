const { User } = require('../models')
const { jikan, mangadex, youtube } = require('../apis/axios')

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
      console.log(err)
      next(err)
    }
  }
}