var faker = require("faker")
var helpers = require("./helpers")
var { generateUniqueUser } = require("./entities/user")
var { generateUniqueTag } = require("./entities/tag")
var { generateUniqueAvailability } = require("./entities/availability")
var { generateUniqueCatalogue } = require("./entities/catalogue")

var { currentEpochTime, secondsInADay, fakerSeed } = helpers

faker.seed(fakerSeed)

var fullData = {}

function generateUniqueBooking(user, catalogue, bookings) {
  var uuid = `Booking_${faker.random.uuid()}`
  var amount = faker.random.number({ min: 10, max: 100 }).toString()
  var baseData = {
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

  var gsiData1 = {
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

  var gsiData2 = {
    partitionKey: {
      S: catalogue.partitionKey.S
    },
    sortKey: {
      S: uuid
    },
    BookingAmount: {
      S: amount
    }
  }

  fullData[`${baseData.partitionKey.S}_${baseData.sortKey.S}`] = baseData
  fullData[`${baseData.partitionKey.S}_${gsiData1.partitionKey.S}`] = gsiData1
  fullData[`${baseData.partitionKey.S}_${gsiData2.partitionKey.S}`] = gsiData2
  bookings.push(baseData)
  helpers.printPretty(baseData)
  return baseData
}

function generateUniqueEnrollment(user, catalogue, enrollments) {
  var uuid = `Enrollment_${faker.random.uuid()}`
  var fee = faker.random.number({ min: 10, max: 100 }).toString()
  var baseData = {
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

  var gsiData1 = {
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

  var gsiData2 = {
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

  fullData[`${baseData.partitionKey.S}_${baseData.sortKey.S}`] = baseData
  fullData[`${baseData.partitionKey.S}_${gsiData1.partitionKey.S}`] = gsiData1
  fullData[`${baseData.partitionKey.S}_${gsiData2.partitionKey.S}`] = gsiData2
  enrollments.push(baseData)
  helpers.printPretty(baseData)
  return baseData
}

function generateAllData(
  numberOfCatalogues,
  numberOfUsers,
  numberOfTags,
  numberOfAvailabilties,
  numberOfBookings,
  numberOfEnrollments
) {
  var users = []
  for (var i = 0; i < numberOfUsers; i++) {
    var data = generateUniqueUser(users)
    fullData[`${data.partitionKey.S}_${data.sortKey.S}`] = data
    users.push(data)
    console.log("Generated", "User")
  }

  var tags = []
  for (var i = 0; i < numberOfTags; i++) {
    var data = generateUniqueTag()
    fullData[`${data.partitionKey.S}_${data.sortKey.S}`] = data
    tags.push(data)
    console.log("Generated", "Tag")
  }

  var availabilities = []
  for (var i = 0; i < numberOfAvailabilties; i++) {
    var data = generateUniqueAvailability()
    fullData[`${data.partitionKey.S}_${data.sortKey.S}`] = data
    availabilities.push(data)
    console.log("Generated", "Availability")
  }

  var catalogues = []
  for (var i = 0; i < numberOfCatalogues; i++) {
    var tag = faker.random.objectElement(tags)
    var availability = faker.random.objectElement(availabilities)

    generateUniqueCatalogue(tag, availability, catalogues)
    console.log("Generated", "Catalogue")
  }

  var bookings = []
  for (var i = 0; i < numberOfBookings; i++) {
    var user = faker.random.objectElement(users)
    var catalogue = faker.random.objectElement(catalogues)
    generateUniqueBooking(user, catalogue, bookings)
    console.log("Generated", "Bookings")
  }

  var enrollments = []
  for (var i = 0; i < numberOfEnrollments; i++) {
    var user = faker.random.objectElement(users)
    var catalogue = faker.random.objectElement(catalogues)
    generateUniqueEnrollment(user, catalogue, enrollments)
    console.log("Generated", "Enrollment")
  }

  return {
    ...fullData
  }
}

module.exports.generateAllData = generateAllData
