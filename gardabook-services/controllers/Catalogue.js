'use strict';

var utils = require('../utils/writer.js');
var Catalogue = require('../service/CatalogueService');

module.exports.addCatalogue = function addCatalogue(req, res, next) {
  var xIntRole = '';
  var body;
  if (process.env.NODE_ENV == 'development') {
    xIntRole = req.swagger.params['x-int-role'].value;
    body = req.swagger.params['body'].value;
  } else {
    // xIntRole = '';
    body = req.body;
    
  }
  console.log(body);
  Catalogue.addCatalogue(xIntRole, body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteCatalogue = function deleteCatalogue(req, res, next) {
  var xIntRole = '';
  var catalogueId = '';
  var api_key = '';
  if (process.env.NODE_ENV == 'development') {
    xIntRole = req.swagger.params['x-int-role'].value;
    catalogueId = req.swagger.params['catalogueId'].value;
    api_key = req.swagger.params['api_key'].value;
  } else {
    xIntRole = req.params['x-int-role'].value;
    catalogueId = req.params['catalogueId'].value;
    api_key = req.params['api_key'].value;
  }
  Catalogue.deleteCatalogue(xIntRole, catalogueId, api_key)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.readCatalogueByTags = function readCatalogueByTags(req, res, next) {
  var xIntRole = '';
  var tags = '';
  if (process.env.NODE_ENV == 'development') {
    xIntRole = req.swagger.params['x-int-role'].value;
    tags = req.swagger.params['tags'].value;
  } else {
    xIntRole = req.params['x-int-role'].value;
    tags = req.params['tags'].value;
  }
  Catalogue.readCatalogueByTags(xIntRole, tags)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.readCatalogueByAvailabilityId = function readCatalogueByAvailabilityId(req, res, next) {
  var xIntRole = '';
  var availabilityId = '';
  if (process.env.NODE_ENV == 'development') {
    xIntRole = req.swagger.params['x-int-role'].value;
    availabilityId = req.swagger.params['availabilityId'].value;
  } else {
    xIntRole = req.swagger.params['x-int-role'].value;
    availabilityId = req.swagger.params['availabilityId'].value;
  }
  Catalogue.readCatalogueByAvailabilityId(xIntRole, availabilityId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.readCatalogue = function readCatalogue(req, res, next) {
  var xIntRole = '';
  var catalogueId = '';
  if (process.env.NODE_ENV == 'development') {
    xIntRole = req.swagger.params['x-int-role'].value;
    catalogueId = req.swagger.params['catalogueId'].value;
  } else {
    xIntRole = req.params['x-int-role'].value;
    catalogueId = req.params['catalogueId'].value;
  }
  Catalogue.readCatalogue(xIntRole, catalogueId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateCatalogue = function updateCatalogue(req, res, next) {
  var xIntRole = '';
  var body;
  if (process.env.NODE_ENV == 'development') {
    xIntRole = req.swagger.params['x-int-role'].value;
    body = req.swagger.params['body'].value;
  } else {
    xIntRole = req.params['x-int-role'].value;
    body = req.params['body'].value;
  }
  Catalogue.updateCatalogue(xIntRole, body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};