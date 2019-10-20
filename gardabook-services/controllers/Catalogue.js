'use strict';

var utils = require('../utils/writer.js');
var Catalogue = require('../service/CatalogueService');

module.exports.addCatalogue = function addCatalogue (req, res, next) {
  var xIntRole = req.swagger.params['x-int-role'].value;
  var body = req.swagger.params['body'].value;
  Catalogue.addCatalogue(xIntRole,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteCatalogue = function deleteCatalogue (req, res, next) {
  var xIntRole = req.swagger.params['x-int-role'].value;
  var catalogueId = req.swagger.params['catalogueId'].value;
  var api_key = req.swagger.params['api_key'].value;
  Catalogue.deleteCatalogue(xIntRole,catalogueId,api_key)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.readCatalogueByTags = function readCatalogueByTags (req, res, next) {
  var xIntRole = req.swagger.params['x-int-role'].value;
  var tags = req.swagger.params['tags'].value;
  Catalogue.readCatalogueByTags(xIntRole,tags)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAvailabilityByCatalogueId = function getAvailabilityByCatalogueId (req, res, next) {
  var xIntRole = req.swagger.params['x-int-role'].value;
  var catalogueId = req.swagger.params['catalogueId'].value;
  Catalogue.getAvailabilityByCatalogueId(xIntRole,catalogueId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getCatalogueById = function getCatalogueById (req, res, next) {
  var xIntRole = req.swagger.params['x-int-role'].value;
  var catalogueId = req.swagger.params['catalogueId'].value;
  Catalogue.getCatalogueById(xIntRole,catalogueId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateCatalgoue = function updateCatalgoue (req, res, next) {
  var xIntRole = req.swagger.params['x-int-role'].value;
  var body = req.swagger.params['body'].value;
  Catalogue.updateCatalgoue(xIntRole,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
