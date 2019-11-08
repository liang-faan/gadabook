'use strict';

const {
  createCatalogue,
  readCatalogues,
  readCatalogue,
  updateCatalogue,
  deleteCatalogue,
  readAllTags
} = require("../model/entities/catalogue")

const {
  createAvailability,
  readAvailability,
  updateAvailability,
  deleteAvailability
} = require("../model/entities/availability")

const { newUuid } = require("../utils/uuidGenerator")

/**
 * Add a new catalogue to GardaBook
 * 
 *
 * jwtSub String 
 * body Catalogue Catalogue object that needs to be added to the system
 * no response value expected for this operation
 **/
exports.addCatalogue = function (jwtSub, body) {
  var catalogueId = newUuid("Catalogue_")

  var params = {
    pKey: String(catalogueId),
    sKey: String(catalogueId),
    name: String(body.name),
    currency: String(body.currency),
    tnc: String(body.tnc),
    rate: String(body.rate),
    unit: String(body.unit),
    remark: String(body.remark),
    tag: String(body.tag),
    availabilityId: String(body.availabilityId),
    venue: String(body.venue),
    city: String(body.city),
    address: String(body.address),
    createdAt: String(Date.now()),
    updatedAt: String(Date.now())
  }

  return createCatalogue(params)
}


/**
 * Deletes a catalogue
 * 
 *
 * jwtSub String 
 * catalogueId Long Catalogue id to delete
 * api_key String  (optional)
 * no response value expected for this operation
 **/
exports.deleteCatalogue = function (jwtSub, catalogueId, api_key) {
  var params = {
    pKey: String(catalogueId),
    sKey: String(catalogueId)
  }

  return deleteCatalogue(params)
}


/**
 * Finds catalogue by tags
 * Multiple tag values can be provided with comma separated strings
 *
 * jwtSub String 
 * tag List Status values that need to be considered for filter (optional)
 * providerName List Providers of the catalogue (optional)
 * returns List
 **/
exports.readCatalogueByTags = function (jwtSub, tags) {

  let tagIds = []
  var allTags = false

  tags.forEach((item, index) => {
    tagIds.push("Tag_" + item)
    if (item == "All") {
        allTags = true
        return
      }
    })

  if (allTags) {
    var params = {
      pKey: "Tag_All",
      sKey: ""
    }

    var data = readAllTags(params)
    .then((response) => {
        if (response) {
          return readCatalogueByGsiKeys(response)
        }
        else {
          return { message: "error reading ctalogue" }
        }
    })
    .catch((error) => {
      return { message: "error reading ctalogue" }
    })

    return data;
  }
  else {
    return readCatalogueByGsiKeys(tagIds)
  }
}


/**
 * Find catalogue by availabilityID
 * Returns list of catalogues with the availability Id
 *
 * jwtSub String 
 * catalogueId Long ID of catalogue
 * returns List
 **/
exports.readCatalogueByAvailabilityId = function (jwtSub, availabilityId) {
  return readCatalogueByGsiKeys(availabilityId)
}

const readCatalogueByGsiKeys = (keys) => {
  var list = String(keys).split(',');

  let results = [];

  list.forEach((item, index) => {
    var params = {
      pKey: String(item),
      sKey: String(item)
    }
    results.push(readCatalogues(params))
  })

  return Promise.all(results).then(data => {
    let temp = [];
    data.forEach((item, index) => {
      item.forEach((item2, index) => {
        temp.push(item2)
      })
    })
    return { "catalogues": Array.prototype.concat.apply(temp) }
  })
    .catch(error => {
      console.log(error)
    })
}


/**
 * Find Catalogue by ID
 * Returns a single Catalogue
 *
 * jwtSub String 
 * catalogueId Long ID of catalogue to return
 * returns Catalogue
 **/
exports.readCatalogue = function (jwtSub, catalogueId) {
  var params = {
    pKey: String(catalogueId),
    sKey: String(catalogueId),
  }

  return readCatalogue(params)
}

exports.createAvailability = function (jwtSub) {

  var i;
  for (i = 1; i < 5; i++) {

    var availabilityId = newUuid("Availability_")

    var params = {
      pKey: String(availabilityId),
      sKey: String(availabilityId),
      date: String(Date.now() + i),
      time: String(availabilityId),
      slot: String(availabilityId),
      createdAt: String(Date.now()),
      updatedAt: String(Date.now())
    }

    createAvailability(params)
  }
}


/**
 * Update an existing catalogue item
 * 
 *
 * jwtSub String 
 * body Catalogue Catalogue object that needs to be update into the system
 * no response value expected for this operation
 **/
exports.updateCatalogue = function (jwtSub, body) {
  var params = {
    pKey: String(body.catalogueId),
    sKey: String(body.catalogueId),
    name: String(body.name),
    currency: String(body.currency),
    tnc: String(body.tnc),
    rate: String(body.rate),
    unit: String(body.unit),
    remark: String(body.remark),
    tag: String(body.tag),
    availabilityId: String(body.availabilityId),
    venue: String(body.venue),
    city: String(body.city),
    address: String(body.address),
    createdAt: String(Date.now()),
    updatedAt: String(Date.now())
  }

  return updateCatalogue(params)
}

