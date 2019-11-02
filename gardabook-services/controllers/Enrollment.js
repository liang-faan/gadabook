'use strict';
var swagger = require("../utils/swaggerTools");
var utils = require('../utils/writer.js');
var Enrollment = require('../service/EnrollmentService');

module.exports.createEnrollment = function createEnrollment(req, res, next) {
  var xIntRole = '';
  var body;
  if (process.env.NODE_ENV == 'development') {
    xIntRole = req.swagger.params['x-int-role'].value;
    body = req.swagger.params['body'].value;
  } else {
    xIntRole = req.params['x-int-role'].value;
    body = req.params['body'].value;
  }
  Enrollment.createEnrollment(xIntRole, body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserEnrollment = function getUserEnrollment(req, res, next) {

  var xIntRole = '';
  var userId;
  console.log(req);
  if (process.env.NODE_ENV == 'development') {
    xIntRole = req.swagger.params['x-int-role'].value;
    userId = req.swagger.params['userId'].value;
  } else {
    xIntRole = req.headers['x-int-role'];
    userId = req.query.userId;
    console.log(xIntRole);
    console.log(userId);
  }

  Enrollment.getUserEnrollment(xIntRole, userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getEnrollment = function getEnrollment(req, res, next) {

  var xIntRole = '';
  var enrollmentId;
  if (process.env.NODE_ENV == 'development') {
    xIntRole = req.swagger.params['x-int-role'].value;
    enrollmentId = req.swagger.params['enrollmentId'].value;
  } else {
    xIntRole = req.params['x-int-role'].value;
    enrollmentId = req.params['enrollmentId'].value;
  }
  Enrollment.getEnrollment(xIntRole, enrollmentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteEnrollment = function deleteEnrollment(req, res, next) {

  var xIntRole = '';
  var enrollmentId;
  if (process.env.NODE_ENV == 'development') {
    xIntRole = req.swagger.params['x-int-role'].value;
    enrollmentId = req.swagger.params['enrollmentId'].value;
  } else {
    xIntRole = req.params['x-int-role'].value;
    enrollmentId = req.params['enrollmentId'].value;
  }
  Enrollment.deleteEnrollment(xIntRole, enrollmentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};