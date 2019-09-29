var faker = require("faker")
var helpers = require("../helpers")

var { currentEpochTime, secondsInADay } = helpers

function generateUniqueUser() {
  var uuid = `User_${faker.random.uuid()}`
  var userUser = {
    pKey: {
      S: uuid
    },
    sKey: {
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

  helpers.printPretty(userUser)
  return { userUser }
}

module.exports = {
  generateUniqueUser
}
