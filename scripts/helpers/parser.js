const playlistParser = require('iptv-playlist-parser')
const Playlist = require('./Playlist')
const utils = require('./utils')
const file = require('./file')

const parser = {}

parser.parseIndex = function () {
  const content = file.read('index.m3u')
  const result = playlistParser.parse(content)

  return result.items
}

parser.parsePlaylist = async function (url) {
  const content = file.read(url)
  const result = playlistParser.parse(content)
  const name = file.getFilename(url)
  const country = utils.code2name(name)

  return new Playlist({ header: result.header, items: result.items, url, country, name })
}

module.exports = parser