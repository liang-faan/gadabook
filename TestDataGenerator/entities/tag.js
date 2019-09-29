var faker = require("faker")
var helpers = require("../helpers")

var { currentEpochTime, secondsInADay } = helpers

function generateUniqueTag() {
  var uuid = `Tag_${faker.random.uuid()}`
  var data = {
    partitionKey: {
      S: uuid
    },
    sortKey: {
      S: uuid
    },
    Description: {
      S: faker.lorem.paragraphs(1)
    },
    Active: {
      BOOL: true
    }
  }

  helpers.printPretty(data)
  return data
}

module.exports = {
  generateUniqueTag
}
