'use strict';
var utils = require('../utils/writer.js');
var Enrollment = require('../service/EnrollmentService');

module.exports.createEnrollment = function createEnrollment(req, res, next) {
  var xIntRole = '';
  var body;
  var apiRespone;
  if (process.env.NODE_ENV == 'development') {
    xIntRole = req.swagger.params['x-int-role'].value;
    body = req.swagger.params['body'].value;
    apiRespone=res;
  } else {
    xIntRole = '';
    body = req.body;
    apiRespone = next;
  }
  Enrollment.createEnrollment(xIntRole, body)
    .then(function (response) {
      utils.writeJson(apiRespone, response);
    })
    .catch(function (response) {
      utils.writeJson(apiRespone, response);
    });
};

module.exports.getUserEnrollment = function getUserEnrollment(req, res, next) {

  var xIntRole = '';
  var userId;
  var apiRespone;
  console.log(req);
  if (process.env.NODE_ENV == 'development') {
    xIntRole = req.swagger.params['x-int-role'].value;
    userId = req.swagger.params['userId'].value;
    apiRespone=res;
  } else {
    // xIntRole = req.headers['x-int-role'];
    userId = req.query.userId;
    console.log(xIntRole);
    console.log(userId);
    apiRespone = next;
  }

  Enrollment.getUserEnrollment(xIntRole, userId)
    .then(function (response) {
      utils.writeJson(apiRespone, response);
    })
    .catch(function (response) {
      utils.writeJson(apiRespone, response);
    });
};

module.exports.getEnrollment = function getEnrollment(req, res, next) {

  var xIntRole = '';
  var enrollmentId;
  var apiRespone;
  if (process.env.NODE_ENV == 'development') {
    xIntRole = req.swagger.params['x-int-role'].value;
    enrollmentId = req.swagger.params['enrollmentId'].value;
    apiRespone=res;
  } else {
    console.log(req);
    // xIntRole = req.headers['x-int-role'];
    enrollmentId = req.path.enrollmentId;
    apiRespone=next;
  }
  Enrollment.getEnrollment(xIntRole, enrollmentId)
    .then(function (response) {
      utils.writeJson(apiRespone, response);
    })
    .catch(function (response) {
      utils.writeJson(apiRespone, response);
    });
};

module.exports.deleteEnrollment = function deleteEnrollment(req, res, next) {

  var xIntRole = '';
  var enrollmentId;
  var apiRespone;
  if (process.env.NODE_ENV == 'development') {
    xIntRole = req.swagger.params['x-int-role'].value;
    enrollmentId = req.swagger.params['enrollmentId'].value;
    apiRespone =res;
  } else {
    // xIntRole = req.params['x-int-role'].value;
    console.log(req);
    enrollmentId = req.path.enrollmentId;
    apiRespone=next;
  }
  Enrollment.deleteEnrollment(xIntRole, enrollmentId)
    .then(function (response) {
      utils.writeJson(apiRespone, response);
    })
    .catch(function (response) {
      utils.writeJson(apiRespone, response);
    });
};