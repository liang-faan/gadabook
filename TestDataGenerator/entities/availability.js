var faker = require("faker")
var helpers = require("../helpers")

var { currentEpochTime, secondsInADay } = helpers

function generateUniqueAvailability() {
  var uuid = `Availability_${faker.random.uuid()}`
  var data = {
    partitionKey: {
      S: uuid
    },
    sortKey: {
      S: uuid
    },
    Date: {
      N: faker.random
        .number({
          min: currentEpochTime,
          max: currentEpochTime + secondsInADay * 18
        })
        .toString()
    },
    Slot: {
      N: faker.random
        .number({
          min: 1,
          max: 5
        })
        .toString()
    }
  }

  helpers.printPretty(data)
  return data
}

module.exports = {
  generateUniqueAvailability
}
