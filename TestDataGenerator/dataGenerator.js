var faker = require("faker")
var helpers = require("./helpers")
var { generateUniqueUser } = require("./entities/user")
var { generateUniqueTag } = require("./entities/tag")
var { generateUniqueAvailability } = require("./entities/availability")
var { generateUniqueCatalogue } = require("./entities/catalogue")
var { generateUniqueBooking } = require("./entities/booking")
var { generateUniqueEnrollment } = require("./entities/enrollment")
var { generateUniqueSession } = require("./entities/session")

var { fakerSeed } = helpers
faker.seed(fakerSeed)

var fullData = {}

function generateAllData(
  numberOfCatalogues,
  numberOfUsers,
  numberOfTags,
  numberOfAvailabilties,
  numberOfBookings,
  numberOfEnrollments,
  numberOfSessions
) {
  var users = []
  for (var i = 0; i < numberOfUsers; i++) {
    var data = generateUniqueUser()
    fullData[`${data.partitionKey.S}_${data.sortKey.S}`] = data
    users.push(data)
    console.log("Generated", "User")
  }

  var sessions = []
  for (var i = 0; i < numberOfSessions; i++) {
    var user = faker.random.objectElement(users)
    var data = generateUniqueSession(user)
    fullData[`${data.partitionKey.S}_${data.sortKey.S}`] = data
    sessions.push(data)
    console.log("Generated", "Session")
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

    var {
      catalogueCatalogue,
      tagCatalogue,
      availabilityCatalogue
    } = generateUniqueCatalogue(tag, availability)
    fullData[
      `${catalogueCatalogue.partitionKey.S}_${catalogueCatalogue.sortKey.S}`
    ] = catalogueCatalogue
    fullData[
      `${catalogueCatalogue.partitionKey.S}_${tagCatalogue.partitionKey.S}`
    ] = tagCatalogue
    fullData[
      `${catalogueCatalogue.partitionKey.S}_${availabilityCatalogue.partitionKey.S}`
    ] = availabilityCatalogue
    catalogues.push(catalogueCatalogue)
    console.log("Generated", "Catalogue")
  }

  var bookings = []
  for (var i = 0; i < numberOfBookings; i++) {
    var user = faker.random.objectElement(users)
    var availability = faker.random.objectElement(availabilities)
    var {
      bookingBooking,
      userBooking,
      availabilityBooking
    } = generateUniqueBooking(user, availability)
    fullData[
      `${bookingBooking.partitionKey.S}_${bookingBooking.sortKey.S}`
    ] = bookingBooking
    fullData[
      `${bookingBooking.partitionKey.S}_${userBooking.partitionKey.S}`
    ] = userBooking
    fullData[
      `${bookingBooking.partitionKey.S}_${availabilityBooking.partitionKey.S}`
    ] = availabilityBooking
    bookings.push(bookingBooking)
    console.log("Generated", "Bookings")
  }

  var enrollments = []
  for (var i = 0; i < numberOfEnrollments; i++) {
    var user = faker.random.objectElement(users)
    var catalogue = faker.random.objectElement(catalogues)
    var {
      enrollmentEnrollment,
      userEnrollment,
      catalogueEnrollment
    } = generateUniqueEnrollment(user, catalogue)
    fullData[
      `${enrollmentEnrollment.partitionKey.S}_${enrollmentEnrollment.sortKey.S}`
    ] = enrollmentEnrollment
    fullData[
      `${enrollmentEnrollment.partitionKey.S}_${userEnrollment.partitionKey.S}`
    ] = userEnrollment
    fullData[
      `${enrollmentEnrollment.partitionKey.S}_${catalogueEnrollment.partitionKey.S}`
    ] = catalogueEnrollment
    enrollments.push(enrollmentEnrollment)
    console.log("Generated", "Enrollment")
  }

  return {
    ...fullData
  }
}

module.exports = {
  generateAllData
}
