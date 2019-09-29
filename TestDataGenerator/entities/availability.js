var faker = require("faker")
var helpers = require("../helpers")

var { currentEpochTime, secondsInADay } = helpers

function generateUniqueAvailability(catalogue) {
  var uuid = `Availability_${faker.random.uuid()}`
  var availabilityAvailability = {
    pKey: {
      S: uuid
    },
    sKey: {
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
    catalogueId: {
      S: catalogue.pKey.S
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

  var catalogueAvailability = {
    pKey: {
      S: catalogue.pKey.S
    },
    sKey: {
      S: uuid
    }
  }

  helpers.printPretty(availabilityAvailability)
  return { availabilityAvailability, catalogueAvailability }
}

module.exports = {
  generateUniqueAvailability
}
