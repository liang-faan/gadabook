var faker = require("faker")
var helpers = require("./helpers")

faker.seed(1)

var currentEpochTime = Math.floor(new Date() / 1000)
var secondsInADay = 86400

var fullData = {}

function generateUniqueUser(users) {
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
  users.push(data)
  helpers.printPretty(data)
  return data
}

function generateUniqueTag(tags) {
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
  tags.push(data)
  helpers.printPretty(data)
  return data
}

function generateUniqueAvailability(availabilities) {
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
  availabilities.push(data)
  helpers.printPretty(data)
  return data
}

function generateUniqueCatalogue(tag, availability, catalogues) {
  var variables = {
    Venue: "Room 2",
    Type: "Facility",
    City: faker.address.city,
    Address: faker.address.streetAddress
  }
  var uuid = `Catalogue_${faker.random.uuid()}`
  var name = faker.lorem.word(5)
  var rate = faker.random.number({min: 10, max: 100}).toString()
  var baseData = {
    partitionKey: {
      S: uuid
    },
    sortKey: {
      S: uuid
    },
    TagID: {
      S: tag.partitionKey.S
    },
    AvailabilityID: {
      S: availability.partitionKey.S
    },
    Name: {
      S: name
    },
    Currency: {
      S: "SGD"
    },
    TermsCondition: {
      S: faker.lorem.paragraphs(1)
    },
    Rate: {
      S: rate
    },
    Variables: {
      S: JSON.stringify(variables)
    }
  }

  var gsiData1 = {
    partitionKey: {
      S: uuid
    },
    sortKey: {
      S: tag.partitionKey.S
    },
    Name: {
      S: name
    },
    Rate: {
      S: rate
    }
  }

  var gsiData2 = {
    partitionKey: {
      S: uuid
    },
    sortKey: {
      S: availability.partitionKey.S
    },
    Name: {
      S: name
    },
    Rate: {
      S: rate
    }
  }

  fullData[`${baseData.partitionKey.S}_${baseData.sortKey.S}`] = baseData
  fullData[`${baseData.partitionKey.S}_${gsiData1.sortKey.S}`] = gsiData1
  fullData[`${baseData.partitionKey.S}_${gsiData2.sortKey.S}`] = gsiData2
  catalogues.push(baseData)
  helpers.printPretty(baseData)
  return baseData
}

function generateUniqueBooking(user, catalogue, bookings) {
  var uuid = `Booking_${faker.random.uuid()}`
  var amount = faker.random.number({min: 10, max: 100}).toString()
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
      S: uuid
    },
    sortKey: {
      S: user.partitionKey.S
    },
    Amount: {
      S: amount
    }
  }
  
  var gsiData2 = {
    partitionKey: {
      S: uuid
    },
    sortKey: {
      S: catalogue.partitionKey.S
    },
    Amount: {
      S: amount
    }
  }

  fullData[`${baseData.partitionKey.S}_${baseData.sortKey.S}`] = baseData
  fullData[`${baseData.partitionKey.S}_${gsiData1.sortKey.S}`] = gsiData1
  fullData[`${baseData.partitionKey.S}_${gsiData2.sortKey.S}`] = gsiData2
  bookings.push(baseData)
  helpers.printPretty(baseData)
  return baseData
}

function generateUniqueEnrollment(user, catalogue, enrollments) {
  var uuid = `Enrollment_${faker.random.uuid()}`
  var fee = faker.random.number({min: 10, max: 100}).toString()
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
      S: uuid
    },
    sortKey: {
      S: user.partitionKey.S
    },
    Fee: {
      S: fee
    }
  }
  
  var gsiData2 = {
    partitionKey: {
      S: uuid
    },
    sortKey: {
      S: catalogue.partitionKey.S
    },
    Fee: {
      S: fee
    }
  }

  fullData[`${baseData.partitionKey.S}_${baseData.sortKey.S}`] = baseData
  fullData[`${baseData.partitionKey.S}_${gsiData1.sortKey.S}`] = gsiData1
  fullData[`${baseData.partitionKey.S}_${gsiData2.sortKey.S}`] = gsiData2
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
    generateUniqueUser(users)
    console.log("Generated", "User")
  }

  var tags = []
  for (var i = 0; i < numberOfTags; i++) {
    generateUniqueTag(tags)
    console.log("Generated", "Tag")
  }

  var availabilities = []
  for (var i = 0; i < numberOfAvailabilties; i++) {
    generateUniqueAvailability(availabilities)
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
