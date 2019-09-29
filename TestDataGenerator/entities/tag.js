var faker = require("faker")
var helpers = require("../helpers")

var { currentEpochTime, secondsInADay } = helpers

function generateUniqueTag() {
  var uuid = `Tag_${faker.random.uuid()}`
  var tagTag = {
    pKey: {
      S: uuid
    },
    sKey: {
      S: uuid
    },
    Description: {
      S: faker.lorem.paragraphs(1)
    },
    Active: {
      BOOL: true
    }
  }

  helpers.printPretty(tagTag)
  return { tagTag }
}

module.exports = {
  generateUniqueTag
}
