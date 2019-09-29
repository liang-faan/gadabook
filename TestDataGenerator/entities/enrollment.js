var faker = require("faker")
var helpers = require("../helpers")

var { currentEpochTime, secondsInADay } = helpers

function generateUniqueEnrollment(user, catalogue) {
  var uuid = `Enrollment_${faker.random.uuid()}`
  var fee = faker.random.number({ min: 10, max: 100 }).toString()
  var enrollmentEnrollment = {
    partitionKey: {
      S: uuid
    },
    sortKey: {
      S: uuid
    },
    CatalogueID: {
      S: catalogue.partitionKey.S
    },
    UserID: {
      S: user.partitionKey.S
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
    partitionKey: {
      S: user.partitionKey.S
    },
    sortKey: {
      S: uuid
    },
    EnrollmentFee: {
      S: fee
    }
  }

  var catalogueEnrollment = {
    partitionKey: {
      S: catalogue.partitionKey.S
    },
    sortKey: {
      S: uuid
    },
    EnrollmentFee: {
      S: fee
    }
  }

  helpers.printPretty(enrollmentEnrollment)
  return { enrollmentEnrollment, userEnrollment, catalogueEnrollment }
}

module.exports = {
  generateUniqueEnrollment
}
