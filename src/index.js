const languages = require('./languages.json')
const releases = require('./pages/Release/Releases')
const releaseFile = require('./pages/Release/ReleaseFile')
const userPreference = require('./pages/Release/UserPreference')

module.exports = {
  all: { languages, releases, releaseFile, userPreference }
}