var faker = require("faker")
var helpers = require("../helpers")

var { currentEpochTime, secondsInADay } = helpers

function generateUniqueSession(user) {
  var uuid = `Session_${faker.random.uuid()}`
  var sessionSession = {
    pKey: {
      S: uuid
    },
    sKey: {
      S: uuid
    },
    userId: {
      S: user.pKey.S
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
