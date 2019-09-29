var faker = require("faker")
var helpers = require("../helpers")

var { currentEpochTime, secondsInADay } = helpers

function generateUniqueBooking(user, availability) {
  var uuid = `Booking_${faker.random.uuid()}`
  var amount = faker.random.number({ min: 10, max: 100 }).toString()
  var bookingBooking = {
    partitionKey: {
      S: uuid
    },
    sortKey: {
      S: uuid
    },
    availabilityID: {
      S: availability.partitionKey.S
    },
    UserID: {
      S: user.partitionKey.S
    },
    TransactionID: {
      S: faker.random.uuid()
    },
    Status: {
      S: "ok"
    },
    StartTime: {
      N: faker.random
        .number({
          min: currentEpochTime - secondsInADay * 10,
          max: currentEpochTime - secondsInADay
        })
        .toString()
    },
    EndTime: {
      N: faker.random
        .number({
          min: currentEpochTime + secondsInADay,
          max: currentEpochTime + secondsInADay * 10
        })
        .toString()
    },
    Active: {
      BOOL: true
    },
    Amount: {
      S: amount
    }
  }

  var userBooking = {
    partitionKey: {
      S: user.partitionKey.S
    },
    sortKey: {
      S: uuid
    },
    BookingAmount: {
      S: amount
    }
  }

  var availabilityBooking = {
    partitionKey: {
      S: availability.partitionKey.S
    },
    sortKey: {
      S: uuid
    },
    BookingAmount: {
      S: amount
    }
  }

  helpers.printPretty(bookingBooking)
  return { bookingBooking, userBooking, availabilityBooking }
}

module.exports = {
  generateUniqueBooking
}
