'use strict';
var swagger = require("../utils/swaggerTools");
var utils = require('../utils/writer.js');
var Enrollment = require('../service/EnrollmentService');

swagger.swaggerInitial();

module.exports.createEnrollment = function createEnrollment (req, res, next) {
  var xIntRole = req.swagger.params['x-int-role'].value;
  var body = req.swagger.params['body'].value;
  Enrollment.createEnrollment(xIntRole,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserEnrollment = function getUserEnrollment (req, res, next) {

  var xIntRole = req.swagger.params['x-int-role'].value;
  var userId = req.swagger.params['userId'].value;
  Enrollment.getUserEnrollment(xIntRole,userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getEnrollment = function getEnrollment (req, res, next) {

  var xIntRole = req.swagger.params['x-int-role'].value;
  var enrollmentId = req.swagger.params['enrollmentId'].value;
  Enrollment.getEnrollment(xIntRole,enrollmentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};