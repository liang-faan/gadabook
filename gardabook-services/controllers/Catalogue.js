'use strict';

var utils = require('../utils/writer.js');
var Catalogue = require('../service/CatalogueService');

module.exports.addCatalogue = function addCatalogue(req, res, next) {
  var xIntRole = '';
  var body;
  var apiResponse;
  if (process.env.NODE_ENV == 'development') {
    xIntRole = req.swagger.params['x-int-role'].value;
    body = req.swagger.params['body'].value;
    apiResponse = res;
  } else {
    // xIntRole = '';
    body = req.body;
    apiResponse=next;
    
  }
  console.log(body);
  Catalogue.addCatalogue(xIntRole, body)
    .then(function (response) {
      utils.writeJson(apiResponse, response);
    })
    .catch(function (response) {
      utils.writeJson(apiResponse, response);
    });
};

module.exports.deleteCatalogue = function deleteCatalogue(req, res, next) {
  var xIntRole = '';
  var catalogueId = '';
   var api_key = '';
  var apiResponse;
  if (process.env.NODE_ENV == 'development') {
    xIntRole = req.swagger.params['x-int-role'].value;
    catalogueId = req.swagger.params['catalogueId'].value;
    // api_key = req.swagger.params['api_key'].value;
    apiResponse = res;
  } else {
    // xIntRole = req.params['x-int-role'].value;
    catalogueId = req.path.catalogueId;
    // api_key = req.params['api_key'].value;
    apiResponse = next;     
  }
  Catalogue.deleteCatalogue(xIntRole, catalogueId, api_key)
    .then(function (response) {
      utils.writeJson(apiResponse, response);
    })
    .catch(function (response) {
      utils.writeJson(apiResponse, response);
    });
};

module.exports.readCatalogueByTags = function readCatalogueByTags(req, res, next) {
  var xIntRole = '';
  var tags = '';
  var apiResponse;
  if (process.env.NODE_ENV == 'development') {
    xIntRole = req.swagger.params['x-int-role'].value;
    tags = req.swagger.params['tags'].value;
    apiResponse = res;
  } else {
    // xIntRole = req.params['x-int-role'].value;
    tags = req.query.tags;
    apiResponse=next;
  }

  tags = String(tags).split(',');

  Catalogue.readCatalogueByTags(xIntRole, tags)
    .then(function (response) {
      utils.writeJson(apiResponse, response);
    })
    .catch(function (response) {
      utils.writeJson(apiResponse, response);
    });
};

module.exports.readCatalogueByAvailabilityId = function readCatalogueByAvailabilityId(req, res, next) {
  var xIntRole = '';
  var availabilityId = '';
  var apiResponse;
  if (process.env.NODE_ENV == 'development') {
    xIntRole = req.swagger.params['x-int-role'].value;
    availabilityId = req.swagger.params['availabilityId'].value;
    apiResponse = res;
  } else {
    // xIntRole = req.swagger.params['x-int-role'].value;
    availabilityId = req.path.catalogueId;;
    apiResponse = next;
  }
  Catalogue.readCatalogueByAvailabilityId(xIntRole, availabilityId)
    .then(function (response) {
      utils.writeJson(apiResponse, response);
    })
    .catch(function (response) {
      utils.writeJson(apiResponse, response);
    });
};

module.exports.readCatalogue = function readCatalogue(req, res, next) {
  var xIntRole = '';
  var catalogueId = '';
  var apiResponse;
  if (process.env.NODE_ENV == 'development') {
    xIntRole = req.swagger.params['x-int-role'].value;
    catalogueId = req.swagger.params['catalogueId'].value;
    apiResponse =res;
  } else {
    // xIntRole = req.params['x-int-role'].value;
    console.log(req)
    catalogueId = req.path.catalogueId;
    apiResponse = next;
  }
  Catalogue.readCatalogue(xIntRole, catalogueId)
    .then(function (response) {
      utils.writeJson(apiResponse, response);
    })
    .catch(function (response) {
      utils.writeJson(apiResponse, response);
    });
};

module.exports.updateCatalogue = function updateCatalogue(req, res, next) {
  var xIntRole = '';
  var body;
  var apiResponse;
  if (process.env.NODE_ENV == 'development') {
    xIntRole = req.swagger.params['x-int-role'].value;
    body = req.swagger.params['body'].value;
    apiResponse = res;
  } else {
    // xIntRole = req.params['x-int-role'].value;
    body = req.body;
    apiResponse = next;
  }
  Catalogue.updateCatalogue(xIntRole, body)
    .then(function (response) {
      utils.writeJson(apiResponse, response);
    })
    .catch(function (response) {
      utils.writeJson(apiResponse, response);
    });
};