var faker = require("faker")
var helpers = require("../helpers")

var { currentEpochTime, secondsInADay } = helpers

function generateUniqueEnrollment(user) {
  var uuid = `Enrollment_${faker.random.uuid()}`
  var fee = faker.random.number({ min: 10, max: 100 }).toString()
  var enrollmentEnrollment = {
    pKey: {
      S: uuid
    },
    sKey: {
      S: uuid
    },
    UserID: {
      S: user.pKey.S
    },
    TransactionID: {
      S: faker.random.uuid()
    },
    ExpiryDate: {
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
    Fee: {
      S: fee
    }
  }

  var userEnrollment = {
    pKey: {
      S: user.pKey.S
    },
    sKey: {
      S: uuid
    },
    EnrollmentFee: {
      S: fee
    }
  }

  helpers.printPretty(enrollmentEnrollment)
  return { enrollmentEnrollment, userEnrollment }
}

module.exports = {
  generateUniqueEnrollment
}
