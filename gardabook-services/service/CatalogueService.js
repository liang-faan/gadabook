'use strict';

const { 
  createCatalogue,
  readCatalogue,
  updateCatalogue,
  deleteCatalogue,
  readCataloguelist
} = require("../model/entities/catalogue")

const { newUuid } = require("../utils/uuidGenerator")

/**
 * Add a new catalogue to GardaBook
 * 
 *
 * xIntRole String 
 * body Catalogue Catalogue object that needs to be added to the system
 * no response value expected for this operation
 **/
exports.addCatalogue = function(xIntRole,body) {
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
    tagId: String(body.tagId),
    venue: String(body.venue),
    type: String(body.type),
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
exports.deleteCatalogue = function(xIntRole,catalogueId,api_key) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Finds catalogue by tags or providers
 * Multiple tag values can be provided with comma separated strings
 *
 * xIntRole String 
 * tag List Status values that need to be considered for filter (optional)
 * providerName List Providers of the catalogue (optional)
 * returns List
 **/
exports.findByTags = function(xIntRole,tag,providerName) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "venue" : "venue",
  "catalogueId" : 0,
  "address" : "address",
  "city" : "city",
  "rateUnit" : "Minute",
  "remark" : "remark",
  "provider" : {
    "firstName" : "firstName",
    "lastName" : "lastName",
    "userStatus" : 5,
    "phone" : "phone",
    "userId" : 1,
    "email" : "email",
    "username" : "username"
  },
  "rate" : 5.63737665663332876420099637471139430999755859375,
  "terms" : "terms",
  "name" : "NUS ISS Meeting Room#5",
  "currency" : "SGD",
  "tag" : [ {
    "tagId" : 6,
    "descritpion" : "descritpion",
    "status" : "Active"
  }, {
    "tagId" : 6,
    "descritpion" : "descritpion",
    "status" : "Active"
  } ],
  "status" : "Open"
}, {
  "venue" : "venue",
  "catalogueId" : 0,
  "address" : "address",
  "city" : "city",
  "rateUnit" : "Minute",
  "remark" : "remark",
  "provider" : {
    "firstName" : "firstName",
    "lastName" : "lastName",
    "userStatus" : 5,
    "phone" : "phone",
    "userId" : 1,
    "email" : "email",
    "username" : "username"
  },
  "rate" : 5.63737665663332876420099637471139430999755859375,
  "terms" : "terms",
  "name" : "NUS ISS Meeting Room#5",
  "currency" : "SGD",
  "tag" : [ {
    "tagId" : 6,
    "descritpion" : "descritpion",
    "status" : "Active"
  }, {
    "tagId" : 6,
    "descritpion" : "descritpion",
    "status" : "Active"
  } ],
  "status" : "Open"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Find availability by catalogue ID
 * Returns list of availability of catalogue
 *
 * xIntRole String 
 * catalogueId Long ID of catalogue
 * returns List
 **/
exports.getAvailabilityByCatalogueId = function(xIntRole,catalogueId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "date" : "2000-01-23",
  "availablityId" : 0,
  "catalogue" : {
    "venue" : "venue",
    "catalogueId" : 0,
    "address" : "address",
    "city" : "city",
    "rateUnit" : "Minute",
    "remark" : "remark",
    "provider" : {
      "firstName" : "firstName",
      "lastName" : "lastName",
      "userStatus" : 5,
      "phone" : "phone",
      "userId" : 1,
      "email" : "email",
      "username" : "username"
    },
    "rate" : 5.63737665663332876420099637471139430999755859375,
    "terms" : "terms",
    "name" : "NUS ISS Meeting Room#5",
    "currency" : "SGD",
    "tag" : [ {
      "tagId" : 6,
      "descritpion" : "descritpion",
      "status" : "Active"
    }, {
      "tagId" : 6,
      "descritpion" : "descritpion",
      "status" : "Active"
    } ],
    "status" : "Open"
  }
}, {
  "date" : "2000-01-23",
  "availablityId" : 0,
  "catalogue" : {
    "venue" : "venue",
    "catalogueId" : 0,
    "address" : "address",
    "city" : "city",
    "rateUnit" : "Minute",
    "remark" : "remark",
    "provider" : {
      "firstName" : "firstName",
      "lastName" : "lastName",
      "userStatus" : 5,
      "phone" : "phone",
      "userId" : 1,
      "email" : "email",
      "username" : "username"
    },
    "rate" : 5.63737665663332876420099637471139430999755859375,
    "terms" : "terms",
    "name" : "NUS ISS Meeting Room#5",
    "currency" : "SGD",
    "tag" : [ {
      "tagId" : 6,
      "descritpion" : "descritpion",
      "status" : "Active"
    }, {
      "tagId" : 6,
      "descritpion" : "descritpion",
      "status" : "Active"
    } ],
    "status" : "Open"
  }
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Find Catalogue by ID
 * Returns a single Catalogue
 *
 * xIntRole String 
 * catalogueId Long ID of catalogue to return
 * returns Catalogue
 **/
exports.getCatalogueById = function(xIntRole,catalogueId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "venue" : "venue",
  "catalogueId" : 0,
  "address" : "address",
  "city" : "city",
  "rateUnit" : "Minute",
  "remark" : "remark",
  "provider" : {
    "firstName" : "firstName",
    "lastName" : "lastName",
    "userStatus" : 5,
    "phone" : "phone",
    "userId" : 1,
    "email" : "email",
    "username" : "username"
  },
  "rate" : 5.63737665663332876420099637471139430999755859375,
  "terms" : "terms",
  "name" : "NUS ISS Meeting Room#5",
  "currency" : "SGD",
  "tag" : [ {
    "tagId" : 6,
    "descritpion" : "descritpion",
    "status" : "Active"
  }, {
    "tagId" : 6,
    "descritpion" : "descritpion",
    "status" : "Active"
  } ],
  "status" : "Open"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update an existing catalogue item
 * 
 *
 * xIntRole String 
 * body Catalogue Catalogue object that needs to be update into the system
 * no response value expected for this operation
 **/
exports.updateCatalgoue = function(xIntRole,body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

