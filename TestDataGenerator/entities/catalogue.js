var faker = require("faker")
var helpers = require("../helpers")

var { currentEpochTime, secondsInADay } = helpers

function generateUniqueCatalogue(tag, availability) {
  var variables = {
    Venue: "Room 2",
    Type: "Facility",
    City: faker.address.city,
    Address: faker.address.streetAddress
  }
  var uuid = `Catalogue_${faker.random.uuid()}`
  var name = faker.lorem.word(5)
  var rate = faker.random.number({ min: 10, max: 100 }).toString()
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
      S: tag.partitionKey.S
    },
    sortKey: {
      S: uuid
    },
    CatalogueName: {
      S: name
    },
    CatalogueRate: {
      S: rate
    }
  }

  var gsiData2 = {
    partitionKey: {
      S: availability.partitionKey.S
    },
    sortKey: {
      S: uuid
    },
    CatalogueName: {
      S: name
    },
    CatalogueRate: {
      S: rate
    }
  }

  fullData[`${baseData.partitionKey.S}_${baseData.sortKey.S}`] = baseData
  fullData[`${baseData.partitionKey.S}_${gsiData1.partitionKey.S}`] = gsiData1
  fullData[`${baseData.partitionKey.S}_${gsiData2.partitionKey.S}`] = gsiData2
  catalogues.push(baseData)
  helpers.printPretty(baseData)
  return baseData
}
