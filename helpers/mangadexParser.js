class MangadexGeneralParser {
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

  get state () {
    return this.response.attributes.state
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

class MangadexChaptersParser {
  constructor(resp) {
    this.resp = resp
  }

  get id() {
    return this.resp.id
  }

  get chapters() {
    return this.resp.attributes.chapter
  }
  
  get title() {
    return this.resp.attributes.title
  }

  get lang() {
    return this.resp.attributes.translatedLanguage
  }

  get mangaPics() {
    const hash = this.resp.attributes.hash
    const baseURL = 'https://uploads.mangadex.org/data'
    const pics = this.resp.attributes.data.map(e => {
      return `${baseURL}/${hash}/${e}`
    })
    return pics
  }
}

module.exports = { MangadexGeneralParser, MangadexChaptersParser }