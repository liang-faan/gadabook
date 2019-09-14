var faker = require("faker")
var helpers = require("./helpers")

faker.seed(1)

var currentEpochTime = Math.floor(new Date() / 1000)
var secondsInADay = 86400

var fullData = {}

function generateUniqueUser() {
  var uuid = `User_${faker.random.uuid()}`
  var data = {
    partitionKey: {
      S: uuid
    },
    sortKey: {
      S: uuid
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
      BOOL: true
    }
  }

  fullData[`${data.partitionKey.S}_${data.sortKey.S}`] = data
  helpers.printPretty(data)
  return data
}

function generateUniqueTag() {
  var uuid = `Tag_${faker.random.uuid()}`
  var data = {
    partitionKey: {
      S: uuid
    },
    sortKey: {
      S: uuid
    },
    Description: {
      S: faker.lorem.paragraphs(1)
    },
    Active: {
      BOOL: true
    }
  }

  fullData[`${data.partitionKey.S}_${data.sortKey.S}`] = data
  helpers.printPretty(data)
  return data
}

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

  fullData[`${data.partitionKey.S}_${data.sortKey.S}`] = data
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
  var uuid = `Catalogue_${faker.random.uuid()}`
  var data = {
    partitionKey: {
      S: uuid
    },
    sortKey: {
      S: uuid
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

  var data2 = {
    partitionKey: {
      S: uuid
    },
    sortKey: {
      S: tag.partitionKey.S
    }
  }

  var data3 = {
    partitionKey: {
      S: uuid
    },
    sortKey: {
      S: availability.partitionKey.S
    },
    anotherAttributeForConvenience: {
      S: "attribute about the relationship"
    }
  }

  fullData[`${data.partitionKey.S}_${data.sortKey.S}`] = data
  fullData[`${data.partitionKey.S}_${data2.sortKey.S}`] = data2
  fullData[`${data.partitionKey.S}_${data3.sortKey.S}`] = data3
  helpers.printPretty(data)
  return data
}

function generateUniqueBooking(user, catalogue) {
  var uuid = `Booking_${faker.random.uuid()}`
  var data = {
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
      S: faker.random
        .number({
          min: 10,
          max: 100
        })
        .toString()
    }
  }

  var data2 = {
    partitionKey: {
      S: user
    },
    sortKey: data.partitionKey.S
  }

  fullData[`${data.partitionKey.S}_${data.sortKey.S}`] = data
  fullData[`${data.partitionKey.S}_${data2.sortKey.S}`] = data
  helpers.printPretty(data)
  return data
}

function generateUniqueEnrollment(user, catalogue) {
  var uuid = `Enrollment_${faker.random.uuid()}`
  var data = {
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
      S: faker.random
        .number({
          min: 10,
          max: 100
        })
        .toString()
    }
  }

  fullData[`${data.partitionKey.S}_${data.sortKey.S}`] = data
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
    var tags = Object.keys(fullData)
      .filter(function(d) {
        return d.match(/^Tag_/)
      })
      .reduce((res, key) => ((res[key] = fullData[key]), res), {})
    var tag = faker.random.objectElement(tags)

    var availabilities = Object.keys(fullData)
      .filter(function(d) {
        return d.match(/^Availability_/)
      })
      .reduce((res, key) => ((res[key] = fullData[key]), res), {})
    var availability = faker.random.objectElement(availabilities)

    generateUniqueCatalogue(tag, availability)
    console.log("Generated", "Catalogue")
  }

  for (var i = 0; i < numberOfBookings; i++) {
    // var users = Object.keys(fullData).filter(function(d) {
    //   return d.match(/^User_/)
    // })
    // var user = faker.random.objectElement(users)
    // var catalogues = Object.keys(fullData).filter(function(d) {
    //   return d.match(/^Catalogue_/)
    // })
    // var catalogue = faker.random.objectElement(catalogues)
    // generateUniqueBooking(user, catalogue)
    // console.log("Generated", "Bookings")
  }

  for (var i = 0; i < numberOfEnrollments; i++) {
    // var user = faker.random.objectElement(users)
    // var catalogue = faker.random.objectElement(catalogues)
    // generateUniqueEnrollment(user, catalogue)
    console.log("Generated", "Enrollment")
  }

  return {
    ...fullData
  }
}

module.exports.generateAllData = generateAllData
