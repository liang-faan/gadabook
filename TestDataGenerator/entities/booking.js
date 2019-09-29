var faker = require("faker")
var helpers = require("../helpers")

var { currentEpochTime, secondsInADay } = helpers

function generateUniqueBooking(user, availability) {
  var uuid = `Booking_${faker.random.uuid()}`
  var amount = faker.random.number({ min: 10, max: 100 }).toString()
  var bookingBooking = {
    pKey: {
      S: uuid
    },
    sKey: {
      S: uuid
    },
    availabilityID: {
      S: availability.pKey.S
    },
    UserID: {
      S: user.pKey.S
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
    pKey: {
      S: user.pKey.S
    },
    sKey: {
      S: uuid
    },
    BookingAmount: {
      S: amount
    }
  }

  var availabilityBooking = {
    pKey: {
      S: availability.pKey.S
    },
    sKey: {
      S: uuid
    }
  }

  helpers.printPretty(bookingBooking)
  return { bookingBooking, userBooking, availabilityBooking }
}

module.exports = {
  generateUniqueBooking
}
