'use strict';

var utils = require('../utils/writer.js');

const { getJwtUser } = require('../utils/jwtHelper')

var Catalogue = require('../service/CatalogueService');

module.exports.addCatalogue = function addCatalogue(req, res, next) {
  var jwtSub = '';
  var body;
  var apiResponse;
  if (process.env.NODE_ENV == 'development') {
    jwtSub = req.swagger.params['x-int-role'].value;
    body = req.swagger.params['body'].value;
    apiResponse = res;
  } else {
    jwtSub = getJwtUser(req);
    body = req.body;
    apiResponse=next;
    
  }
  console.log(body);
  Catalogue.addCatalogue(jwtSub, body)
    .then(function (response) {
      utils.writeJson(apiResponse, response);
    })
    .catch(function (response) {
      utils.writeJson(apiResponse, response);
    });
};

module.exports.deleteCatalogue = function deleteCatalogue(req, res, next) {
  var jwtSub = '';
  var catalogueId = '';
   var api_key = '';
  var apiResponse;
  if (process.env.NODE_ENV == 'development') {
    jwtSub = req.swagger.params['x-int-role'].value;
    catalogueId = req.swagger.params['catalogueId'].value;
    // api_key = req.swagger.params['api_key'].value;
    apiResponse = res;
  } else {
    jwtSub = getJwtUser(req);
    catalogueId = req.path.catalogueId;
    // api_key = req.params['api_key'].value;
    apiResponse = next;     
  }
  Catalogue.deleteCatalogue(jwtSub, catalogueId, api_key)
    .then(function (response) {
      utils.writeJson(apiResponse, response);
    })
    .catch(function (response) {
      utils.writeJson(apiResponse, response);
    });
};

module.exports.getAllCatalogues = function getAllCatalogues(req, res, next) {
  console.log(req);
  let tags = [];
  tags.push('All');
  var jwtSub = getJwtUser(req);
  Catalogue.readCatalogueByTags(jwtSub, tags)
    .then(function (response) {
      utils.writeJson(next, response);
    })
    .catch(function (response) {
      utils.writeJson(next, response);
    });
}

module.exports.readCatalogueByTags = function readCatalogueByTags(req, res, next) {
  var jwtSub = '';
  var tags = '';
  var apiResponse;
  if (process.env.NODE_ENV == 'development') {
    jwtSub = req.swagger.params['x-int-role'].value;
    tags = req.swagger.params['tags'].value;
    apiResponse = res;
  } else {
    jwtSub = getJwtUser(req);
    console.log(req);
    tags = req.query.tags;
    apiResponse=next;
  }

  tags = String(tags).split(',');

  Catalogue.readCatalogueByTags(jwtSub, tags)
    .then(function (response) {
      utils.writeJson(apiResponse, response);
    })
    .catch(function (response) {
      utils.writeJson(apiResponse, response);
    });
};

module.exports.readCatalogueByAvailabilityId = function readCatalogueByAvailabilityId(req, res, next) {
  var jwtSub = '';
  var availabilityId = '';
  var apiResponse;
  if (process.env.NODE_ENV == 'development') {
    jwtSub = req.swagger.params['x-int-role'].value;
    availabilityId = req.swagger.params['availabilityId'].value;
    apiResponse = res;
  } else {
    jwtSub = getJwtUser(req);
    availabilityId = req.path.availabilityId;
    apiResponse = next;
  }
  Catalogue.readCatalogueByAvailabilityId(jwtSub, availabilityId)
    .then(function (response) {
      utils.writeJson(apiResponse, response);
    })
    .catch(function (response) {
      utils.writeJson(apiResponse, response);
    });
};

module.exports.readCatalogue = function readCatalogue(req, res, next) {
  var jwtSub = '';
  var catalogueId = '';
  var apiResponse;
  if (process.env.NODE_ENV == 'development') {
    jwtSub = req.swagger.params['x-int-role'].value;
    catalogueId = req.swagger.params['catalogueId'].value;
    apiResponse =res;
  } else {
    jwtSub = getJwtUser(req);
    console.log(req)
    catalogueId = req.path.catalogueId;
    apiResponse = next;
  }
  Catalogue.readCatalogue(jwtSub, catalogueId)
    .then(function (response) {
      utils.writeJson(apiResponse, response);
    })
    .catch(function (response) {
      utils.writeJson(apiResponse, response);
    });
};

module.exports.updateCatalogue = function updateCatalogue(req, res, next) {
  var jwtSub = '';
  var body;
  var apiResponse;
  if (process.env.NODE_ENV == 'development') {
    jwtSub = req.swagger.params['x-int-role'].value;
    body = req.swagger.params['body'].value;
    apiResponse = res;
  } else {
    jwtSub = getJwtUser(req);
    body = req.body;
    apiResponse = next;
  }
  Catalogue.updateCatalogue(jwtSub, body)
    .then(function (response) {
      utils.writeJson(apiResponse, response);
    })
    .catch(function (response) {
      utils.writeJson(apiResponse, response);
    });
};