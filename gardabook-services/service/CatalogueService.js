'use strict';

const {
  createCatalogue,
  readCatalogues,
  readCatalogue,
  updateCatalogue,
  deleteCatalogue
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
 * xIntRole String 
 * body Catalogue Catalogue object that needs to be added to the system
 * no response value expected for this operation
 **/
exports.addCatalogue = function (xIntRole, body) {
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
 * xIntRole String 
 * catalogueId Long Catalogue id to delete
 * api_key String  (optional)
 * no response value expected for this operation
 **/
exports.deleteCatalogue = function (xIntRole, catalogueId, api_key) {
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
 * xIntRole String 
 * tag List Status values that need to be considered for filter (optional)
 * providerName List Providers of the catalogue (optional)
 * returns List
 **/
exports.readCatalogueByTags = function (xIntRole, tags) {

  let tagIds = []

  tags.forEach((item, index) => {
    tagIds.push("Tag_" + item)
  })

  return readCatalogueByGsiKeys(tagIds)
}


/**
 * Find catalogue by availabilityID
 * Returns list of catalogues with the availability Id
 *
 * xIntRole String 
 * catalogueId Long ID of catalogue
 * returns List
 **/
exports.readCatalogueByAvailabilityId = function (xIntRole, availabilityId) {
  return readCatalogueByGsiKeys(availabilityId)
}

const readCatalogueByGsiKeys = (keys) => {
  var list = String(keys).split(',');

  var results = []

  list.forEach((item, index) => {
    var params = {
      pKey: String(item),
      sKey: String(item)
    }
    results.push(readCatalogues(params))
  })

  return Promise.all(results).then(data => {
    return data[0]
  })
    .catch(error => {
      console.log(error)
    })
}


/**
 * Find Catalogue by ID
 * Returns a single Catalogue
 *
 * xIntRole String 
 * catalogueId Long ID of catalogue to return
 * returns Catalogue
 **/
exports.readCatalogue = function (xIntRole, catalogueId) {
  var params = {
    pKey: String(catalogueId),
    sKey: String(catalogueId),
  }

  return readCatalogue(params)
}

exports.createAvailability = function (xIntRole) {

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
 * xIntRole String 
 * body Catalogue Catalogue object that needs to be update into the system
 * no response value expected for this operation
 **/
exports.updateCatalogue = function (xIntRole, body) {
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

