var faker = require("faker")
var helpers = require("../helpers")

var { currentEpochTime, secondsInADay } = helpers

function generateUniqueCatalogue(tag, enrollment) {
  var variables = {
    Venue: "Room 2",
    Type: "Facility",
    City: faker.address.city,
    Address: faker.address.streetAddress
  }
  var uuid = `Catalogue_${faker.random.uuid()}`
  var name = faker.lorem.word(5)
  var rate = faker.random.number({ min: 10, max: 100 }).toString()
  var catalogueCatalogue = {
    pKey: {
      S: uuid
    },
    sKey: {
      S: uuid
    },
    enrollmentId: {
      S: enrollment.pKey.S
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

  var tagCatalogue = {
    pKey: {
      S: tag.pKey.S
    },
    sKey: {
      S: uuid
    },
    CatalogueName: {
      S: name
    },
    CatalogueRate: {
      S: rate
    }
  }

  var enrollmentCatalogue = {
    pKey: {
      S: enrollment.pKey.S
    },
    sKey: {
      S: uuid
    }
  }

  helpers.printPretty(catalogueCatalogue)
  return { catalogueCatalogue, tagCatalogue, enrollmentCatalogue }
}

module.exports = {
  generateUniqueCatalogue
}
