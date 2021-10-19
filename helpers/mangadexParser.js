class MangadexParser {
  constructor (response) {
    this.response = response
  }

  get id () {
    return this.response.id
  }

  get title () {
    return this.response.attributes.title.en || this.response.attributes.title.ja
  }

  get description () {
    return this.response.attributes.description.en
  }

  get status () {
    return this.response.attributes.status
  }

  get tags () {
    return this.response.attributes.tags?.map(el => {
      return el.attributes.name.en
    })
  }

  get thumbnail () {
    let fileName = this.response.relationships.map(el => {
      if (el.type === 'cover_art') {
        return el.attributes.fileName
      } else {
        return null
      }
    }).filter(el => typeof el === 'string')[0]
    let id = this.response.id
    let baseurl = 'https://uploads.mangadex.org//covers'
    let suffix = '.512.jpg'
    return `${baseurl}/${id}/${fileName}${suffix}`
  }
}

module.exports = MangadexParser