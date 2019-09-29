var faker = require("faker")
var helpers = require("./helpers")
var { generateUniqueUser } = require("./entities/user")
var { generateUniqueTag } = require("./entities/tag")
var { generateUniqueAvailability } = require("./entities/availability")
var { generateUniqueCatalogue } = require("./entities/catalogue")
var { generateUniqueBooking } = require("./entities/booking")
var { generateUniqueEnrollment } = require("./entities/enrollment")
var { generateSessionObject } = require("./entities/session")

var { currentEpochTime, secondsInADay, fakerSeed } = helpers
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
  // PREPARE GENERATED USERS
  var users = []
  for (var i = 0; i < numberOfUsers; i++) {
    var props = {
      pKey: `User_${faker.random.uuid()}`,
      sKey: pKey,
      role: "normal",
      username: faker.internet.userName(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      dob: faker.random
        .number({
          min: currentEpochTime - secondsInADay * 365 * 40,
          max: currentEpochTime - secondsInADay * 365 * 18
        })
        .toString(),
      gender: "Male",
      address: faker.address.streetAddress(),
      status: "ok",
      active: true
    }

    var { userUser } = generateUniqueUser(props)
    fullData[`${userUser.pKey.S}_${userUser.sKey.S}`] = userUser

    users.push(userUser)
    console.log("Generated", "User")
  }

  // PREPARE GENERATED SESSIONS
  var sessions = []
  for (var i = 0; i < numberOfSessions; i++) {
    var props = {
      pKey: `Session_${faker.random.uuid()}`,
      sKey: pKey,
      userId: faker.random.objectElement(users).pKey.S,
      csrfToken: faker.random.uuid(),
      createTime: "TIME",
      active: true
    }

    var { sessionSession } = generateSessionObject(props)

    fullData[
      `${sessionSession.pKey.S}_${sessionSession.sKey.S}`
    ] = sessionSession

    sessions.push(sessionSession)
    console.log("Generated", "Session")
  }

  var tags = []
  for (var i = 0; i < numberOfTags; i++) {
    var { tagTag } = generateUniqueTag()
    fullData[`${tagTag.pKey.S}_${tagTag.sKey.S}`] = tagTag
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
      `${enrollmentEnrollment.pKey.S}_${enrollmentEnrollment.sKey.S}`
    ] = enrollmentEnrollment
    fullData[
      `${userEnrollment.pKey.S}_${enrollmentEnrollment.pKey.S}`
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
      `${catalogueCatalogue.pKey.S}_${catalogueCatalogue.sKey.S}`
    ] = catalogueCatalogue
    fullData[
      `${tagCatalogue.pKey.S}_${catalogueCatalogue.pKey.S}`
    ] = tagCatalogue
    fullData[
      `${enrollmentCatalogue.pKey.S}_${catalogueCatalogue.pKey.S}`
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
      `${availabilityAvailability.pKey.S}_${availabilityAvailability.sKey.S}`
    ] = availabilityAvailability
    fullData[
      `${catalogueAvailability.pKey.S}_${availabilityAvailability.sKey.S}`
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
      `${bookingBooking.pKey.S}_${bookingBooking.sKey.S}`
    ] = bookingBooking
    fullData[`${userBooking.pKey.S}_${bookingBooking.pKey.S}`] = userBooking
    fullData[
      `${availabilityBooking.pKey.S}_${bookingBooking.pKey.S}`
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
