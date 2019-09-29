var faker = require("faker")
var helpers = require("../helpers")

var { currentEpochTime, secondsInADay } = helpers

function generateUniqueAvailability(catalogue) {
  var uuid = `Availability_${faker.random.uuid()}`
  var availabilityAvailability = {
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
    catalogueId: {
      S: catalogue.partitionKey.S
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
    partitionKey: {
      S: catalogue.partitionKey.S
    },
    sortKey: {
      S: uuid
    }
  }

  helpers.printPretty(availabilityAvailability)
  return { availabilityAvailability, catalogueAvailability }
}

module.exports = {
  generateUniqueAvailability
}
