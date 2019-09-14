var faker = require("faker")
var helpers = require("./helpers")

var currentEpochTime = Math.floor(new Date() / 1000)
var secondsInADay = 86400

var fullData = {}
var users = {}
var tags = {}
var availabilities = {}
var catalogues = {}
var bookings = {}
var enrollments = {}

function generateUniqueUser() {
  var data = {
    partitionKey: {
      S: `User_${faker.random.uuid()}`
    },
    sortKey: {
      S: `User_${faker.random.uuid()}`
    },
    Role: {
      S: "normal"
    },
    Name: {
      S: faker.internet.userName()
    },
    FirstName: {
      S: faker.name.firstName()
    },
    LastName: {
      S: faker.name.lastName()
    },
    Email: {
      S: faker.internet.email()
    },
    Phone: {
      S: faker.phone.phoneNumber()
    },
    DOB: {
      N: faker.random
        .number({
          min: currentEpochTime - secondsInADay * 365 * 40,
          max: currentEpochTime - secondsInADay * 365 * 18
        })
        .toString()
    },
    Gender: {
      S: "Male"
    },
    Address: {
      S: faker.address.streetAddress()
    },
    UserStatus: {
      S: "ok"
    },
    Active: {
      S: "ok"
    }
  }

  fullData[data.partitionKey.S] = data
  helpers.printPretty(data)
  return data
}

function generateUniqueTag() {
  var data = {
    partitionKey: {
      S: `Tag_${faker.random.uuid()}`
    },
    sortKey: {
      S: `Tag_${faker.random.uuid()}`
    },
    Description: {
      S: faker.lorem.paragraphs(1)
    },
    Active: {
      S: "ok"
    }
  }

  fullData[data.partitionKey.S] = data
  helpers.printPretty(data)
  return data
}

function generateUniqueAvailability() {
  var data = {
    partitionKey: {
      S: `Availability_${faker.random.uuid()}`
    },
    sortKey: {
      S: `Availability_${faker.random.uuid()}`
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

  fullData[data.partitionKey.S] = data
  helpers.printPretty(data)
  return data
}

function generateUniqueCatalogue(tag, availability) {
  var variables = {
    Venue: "Room 2",
    Type: "Facility",
    City: faker.address.city,
    Address: faker.address.streetAddress
  }
  var data = {
    partitionKey: {
      S: `Catalogue_${tag.partitionKey.S}`
    },
    sortKey: {
      S: `Catalogue_${tag.partitionKey.S}`
    },
    TagID: {
      S: availability.partitionKey.S
    },
    AvailabilityID: {
      S: faker.random.uuid()
    },
    Name: {
      S: faker.lorem.word(5)
    },
    Currency: {
      S: "SGD"
    },
    TermsCondition: {
      S: faker.lorem.paragraphs(1)
    },
    Rate: {
      S: faker.random
        .number({
          min: 10,
          max: 100
        })
        .toString()
    },
    Variables: {
      S: JSON.stringify(variables)
    }
  }

  fullData[data.partitionKey.S] = data
  helpers.printPretty(data)
  return data
}

function generateUniqueBooking(user, catalogue) {
  var data = {
    partitionKey: {
      S: `Booking_${faker.random.uuid()}`
    },
    sortKey: {
      S: `Booking_${faker.random.uuid()}`
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
      S: "ok"
    },
    Amount: {
      S: faker.random
        .number({
          min: 10,
          max: 100
        })
        .toString()
    }
  }

  fullData[data.partitionKey.S] = data
  helpers.printPretty(data)
  return data
}

function generateUniqueEnrollment(user, catalogue) {
  var data = {
    partitionKey: {
      S: `Enrollment_${faker.random.uuid()}`
    },
    sortKey: {
      S: `Enrollment_${faker.random.uuid()}`
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
      S: "ok"
    },
    Fee: {
      S: faker.random
        .number({
          min: 10,
          max: 100
        })
        .toString()
    }
  }

  fullData[data.partitionKey.S] = data
  helpers.printPretty(data)
  return data
}

function generateAllData(
  numberOfCatalogues,
  numberOfUsers,
  numberOfTags,
  numberOfAvailabilties,
  numberOfBookings,
  numberOfEnrollments
) {
  for (var i = 0; i < numberOfUsers; i++) {
    generateUniqueUser()
    console.log("Generated", "User")
  }

  for (var i = 0; i < numberOfTags; i++) {
    generateUniqueTag()
    console.log("Generated", "Tag")
  }

  for (var i = 0; i < numberOfAvailabilties; i++) {
    generateUniqueAvailability()
    console.log("Generated", "Availability")
  }

  for (var i = 0; i < numberOfCatalogues; i++) {
    var tag = faker.random.objectElement(tags)
    var availability = faker.random.objectElement(availabilities)
    // generateUniqueCatalogue(tag, availability)
    console.log("Generated", "Catalogue")
  }

  for (var i = 0; i < numberOfBookings; i++) {
    var user = faker.random.objectElement(users)
    var catalogue = faker.random.objectElement(catalogues)
    // generateUniqueBooking(user, catalogue)
    console.log("Generated", "Bookings")
  }

  for (var i = 0; i < numberOfEnrollments; i++) {
    var user = faker.random.objectElement(users)
    var catalogue = faker.random.objectElement(catalogues)
    // generateUniqueEnrollment(user, catalogue)
    console.log("Generated", "Enrollment")
  }

  return {
    ...fullData
  }
}

module.exports.generateAllData = generateAllData
