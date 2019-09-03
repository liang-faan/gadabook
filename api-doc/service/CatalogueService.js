'use strict';


/**
 * Add a new catalogue to GardaBook
 * 
 *
 * body Catalogue Catalogue object that needs to be added to the system
 * no response value expected for this operation
 **/
exports.addCatalogue = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Deletes a catalogue
 * 
 *
 * catalogueId Long Catalogue id to delete
 * api_key String  (optional)
 * no response value expected for this operation
 **/
exports.deleteCatalogue = function(catalogueId,api_key) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Finds catalogue by tags or providers
 * Multiple tag values can be provided with comma separated strings
 *
 * tag List Status values that need to be considered for filter (optional)
 * providerName List Providers of the catalogue (optional)
 * returns List
 **/
exports.findByTags = function(tag,providerName) {
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
 * catalogueId Long ID of catalogue
 * returns List
 **/
exports.getAvailabilityByCatalogueId = function(catalogueId) {
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
 * catalogueId Long ID of catalogue to return
 * returns Catalogue
 **/
exports.getCatalogueById = function(catalogueId) {
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
 * body Catalogue Catalogue object that needs to be update into the system
 * no response value expected for this operation
 **/
exports.updateCatalgoue = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

