var faker = require("faker")
var helpers = require("../helpers")

var { currentEpochTime, secondsInADay } = helpers

function generateUniqueSession(user) {
  var uuid = `Session_${faker.random.uuid()}`
  var sessionSession = {
    partitionKey: {
      S: uuid
    },
    sortKey: {
      S: uuid
    },
    userId: {
      S: user.partitionKey.S
    },
    active: {
      BOOL: true
    }
  }

  helpers.printPretty(sessionSession)
  return { sessionSession }
}

module.exports = {
  generateUniqueSession
}
