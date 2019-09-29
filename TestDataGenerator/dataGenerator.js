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
    var { userUser } = generateUniqueUser()
    fullData[`${userUser.partitionKey.S}_${userUser.sortKey.S}`] = userUser
    users.push(userUser)
    console.log("Generated", "User")
  }

  var sessions = []
  for (var i = 0; i < numberOfSessions; i++) {
    var user = faker.random.objectElement(users)
    var { sessionSession } = generateUniqueSession(user)
    fullData[
      `${sessionSession.partitionKey.S}_${sessionSession.sortKey.S}`
    ] = sessionSession
    sessions.push(sessionSession)
    console.log("Generated", "Session")
  }

  var tags = []
  for (var i = 0; i < numberOfTags; i++) {
    var { tagTag } = generateUniqueTag()
    fullData[`${tagTag.partitionKey.S}_${tagTag.sortKey.S}`] = tagTag
    tags.push(tagTag)
    console.log("Generated", "Tag")
  }

  var enrollments = []
  for (var i = 0; i < numberOfEnrollments; i++) {
    var user = faker.random.objectElement(users)
    var { enrollmentEnrollment, userEnrollment } = generateUniqueEnrollment(
      user
    )
    fullData[
      `${enrollmentEnrollment.partitionKey.S}_${enrollmentEnrollment.sortKey.S}`
    ] = enrollmentEnrollment
    fullData[
      `${userEnrollment.partitionKey.S}_${enrollmentEnrollment.partitionKey.S}`
    ] = userEnrollment
    enrollments.push(enrollmentEnrollment)
    console.log("Generated", "Enrollment")
  }

  var catalogues = []
  for (var i = 0; i < numberOfCatalogues; i++) {
    var tag = faker.random.objectElement(tags)
    var enrollment = faker.random.objectElement(enrollments)

    var {
      catalogueCatalogue,
      tagCatalogue,
      enrollmentCatalogue
    } = generateUniqueCatalogue(tag, enrollment)
    fullData[
      `${catalogueCatalogue.partitionKey.S}_${catalogueCatalogue.sortKey.S}`
    ] = catalogueCatalogue
    fullData[
      `${tagCatalogue.partitionKey.S}_${catalogueCatalogue.partitionKey.S}`
    ] = tagCatalogue
    fullData[
      `${enrollmentCatalogue.partitionKey.S}_${catalogueCatalogue.partitionKey.S}`
    ] = enrollmentCatalogue
    catalogues.push(catalogueCatalogue)
    console.log("Generated", "Catalogue")
  }

  var availabilities = []
  for (var i = 0; i < numberOfAvailabilties; i++) {
    var catalogue = faker.random.objectElement(catalogues)
    var {
      availabilityAvailability,
      catalogueAvailability
    } = generateUniqueAvailability(catalogue)
    fullData[
      `${availabilityAvailability.partitionKey.S}_${availabilityAvailability.sortKey.S}`
    ] = availabilityAvailability
    fullData[
      `${catalogueAvailability.partitionKey.S}_${availabilityAvailability.sortKey.S}`
    ] = catalogueAvailability
    availabilities.push(availabilityAvailability)
    console.log("Generated", "Availability")
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
      `${userBooking.partitionKey.S}_${bookingBooking.partitionKey.S}`
    ] = userBooking
    fullData[
      `${availabilityBooking.partitionKey.S}_${bookingBooking.partitionKey.S}`
    ] = availabilityBooking
    bookings.push(bookingBooking)
    console.log("Generated", "Bookings")
  }

  return {
    ...fullData
  }
}

module.exports = {
  generateAllData
}
