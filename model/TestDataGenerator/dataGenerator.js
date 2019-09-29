var faker = require("faker")
var helpers = require("./helpers")
var { generateUserObject } = require("../entities/user")
var { generateTagObject } = require("../entities/tag")
var { generateAvailabilityObject } = require("../entities/availability")
var { generateCatalogueObject } = require("../entities/catalogue")
var { generateBookingObject } = require("../entities/booking")
var { generateEnrollmentObject } = require("../entities/enrollment")
var { generateSessionObject } = require("../entities/session")

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
    var uuid = `User_${faker.random.uuid()}`
    var props = {
      pKey: uuid,
      sKey: uuid,
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

    var { userUser } = generateUserObject(props)
    fullData[`${userUser.pKey.S}_${userUser.sKey.S}`] = userUser

    users.push(userUser)
    console.log("Generated", "User")
  }

  // PREPARE GENERATED SESSIONS
  var sessions = []
  for (var i = 0; i < numberOfSessions; i++) {
    var uuid = `Session_${faker.random.uuid()}`
    var props = {
      pKey: uuid,
      sKey: uuid,
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

  // PREPARE GENERATED TAGS
  var tags = []
  for (var i = 0; i < numberOfTags; i++) {
    var uuid = `Tag_${faker.random.uuid()}`

    var props = {
      pKey: uuid,
      sKey: uuid,
      description: faker.lorem.paragraphs(1),
      active: true
    }

    var { tagTag } = generateTagObject(props)

    fullData[`${tagTag.pKey.S}_${tagTag.sKey.S}`] = tagTag
    tags.push(tagTag)
    console.log("Generated", "Tag")
  }

  // PREPARE GENERATED ENROLLMENTS
  var enrollments = []
  for (var i = 0; i < numberOfEnrollments; i++) {
    var user = faker.random.objectElement(users)
    var uuid = `Enrollment_${faker.random.uuid()}`

    var props = {
      pKey: uuid,
      sKey: uuid,
      userId: user.pKey.S,
      expiryDate: faker.random
        .number({
          min: currentEpochTime + secondsInADay,
          max: currentEpochTime + secondsInADay * 10
        })
        .toString(),
      fee: faker.random.number({ min: 10, max: 100 }).toString(),
      active: true
    }

    var { enrollmentEnrollment, userEnrollment } = generateEnrollmentObject(
      props
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

  // PREPARE GENERATED CATAGLOGUES
  var catalogues = []
  for (var i = 0; i < numberOfCatalogues; i++) {
    var uuid = `Catalogue_${faker.random.uuid()}`
    var tag = faker.random.objectElement(tags)
    var enrollment = faker.random.objectElement(enrollments)

    var props = {
      pKey: uuid,
      sKey: uuid,
      enrollmentId: enrollment.pKey.S,
      name: faker.lorem.word(5),
      currency: "SGD",
      tnc: faker.lorem.paragraphs(1),
      rate: faker.random.number({ min: 10, max: 100 }).toString(),
      unit: "per hour",
      remark: faker.lorem.word(5),
      venue: "Room 2",
      type: "Facility",
      city: faker.address.city(),
      address: faker.address.streetAddress(),
      active: true,
      tagId: tag.pKey.S
    }

    var {
      catalogueCatalogue,
      tagCatalogue,
      enrollmentCatalogue
    } = generateCatalogueObject(props)
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

  // PREPARE GENERATED AVAILABILITIES
  var availabilities = []
  for (var i = 0; i < numberOfAvailabilties; i++) {
    var uuid = `Availability_${faker.random.uuid()}`
    var catalogue = faker.random.objectElement(catalogues)

    var props = {
      pKey: uuid,
      sKey: uuid,
      catalogueId: catalogue.pKey.S,
      date: faker.random
        .number({
          min: currentEpochTime,
          max: currentEpochTime + secondsInADay * 18
        })
        .toString(),
      time: faker.random
        .number({
          min: currentEpochTime,
          max: currentEpochTime + secondsInADay * 18
        })
        .toString(),
      slot: faker.random
        .number({
          min: 1,
          max: 5
        })
        .toString(),
      createdAt: faker.random
        .number({
          min: currentEpochTime,
          max: currentEpochTime + secondsInADay * 18
        })
        .toString(),
      active: true
    }

    var {
      availabilityAvailability,
      catalogueAvailability
    } = generateAvailabilityObject(props)
    fullData[
      `${availabilityAvailability.pKey.S}_${availabilityAvailability.sKey.S}`
    ] = availabilityAvailability
    fullData[
      `${catalogueAvailability.pKey.S}_${availabilityAvailability.sKey.S}`
    ] = catalogueAvailability
    availabilities.push(availabilityAvailability)
    console.log("Generated", "Availability")
  }

  // PREPARE GENERATED BOOKINGS
  var bookings = []
  for (var i = 0; i < numberOfBookings; i++) {
    var uuid = `Booking_${faker.random.uuid()}`
    var availability = faker.random.objectElement(availabilities)
    var user = faker.random.objectElement(users)

    var props = {
      pKey: uuid,
      sKey: uuid,
      userId: user.pKey.S,
      availabilityId: availability.pKey.S,
      startTime: faker.random
        .number({
          min: currentEpochTime - secondsInADay * 10,
          max: currentEpochTime - secondsInADay
        })
        .toString(),
      endTime: faker.random
        .number({
          min: currentEpochTime + secondsInADay,
          max: currentEpochTime + secondsInADay * 10
        })
        .toString(),
      amount: faker.random.number({ min: 10, max: 100 }).toString(),
      active: true
    }

    var {
      bookingBooking,
      userBooking,
      availabilityBooking
    } = generateBookingObject(props)
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
  // console.log(fullData)
  return {
    ...fullData
  }
}

module.exports = {
  generateAllData
}
