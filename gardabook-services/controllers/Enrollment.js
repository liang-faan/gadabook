'use strict';
var utils = require('../utils/writer.js');
const { getJwtUser } = require('../utils/jwtHelper')
var Enrollment = require('../service/EnrollmentService');

module.exports.createEnrollment = function createEnrollment(req, res, next) {
  var jwtSub = '';
  var body;
  var apiRespone;
  if (process.env.NODE_ENV == 'development') {
    jwtSub = req.swagger.params['x-int-role'].value;
    body = req.swagger.params['body'].value;
    apiRespone=res;
  } else {
    jwtSub = getJwtUser(req);
    body = req.body;
    apiRespone = next;
  }
  Enrollment.createEnrollment(jwtSub, body)
    .then(function (response) {
      utils.writeJson(apiRespone, response);
    })
    .catch(function (response) {
      utils.writeJson(apiRespone, response);
    });
};

module.exports.getUserEnrollment = function getUserEnrollment(req, res, next) {

  var jwtSub = '';
  var userId;
  var apiRespone;
  console.log(req);
  if (process.env.NODE_ENV == 'development') {
    jwtSub = req.swagger.params['x-int-role'].value;
    userId = req.swagger.params['userId'].value;
    apiRespone=res;
  } else {
    jwtSub = getJwtUser(req);
    userId = req.query.userId;
    console.log(jwtSub);
    console.log(userId);
    apiRespone = next;
  }

  Enrollment.getUserEnrollment(jwtSub, userId)
    .then(function (response) {
      utils.writeJson(apiRespone, response);
    })
    .catch(function (response) {
      utils.writeJson(apiRespone, response);
    });
};

module.exports.getEnrollment = function getEnrollment(req, res, next) {

  var jwtSub = '';
  var enrollmentId;
  var apiRespone;
  if (process.env.NODE_ENV == 'development') {
    jwtSub = req.swagger.params['x-int-role'].value;
    enrollmentId = req.swagger.params['enrollmentId'].value;
    apiRespone=res;
  } else {
    console.log(req);
    jwtSub = getJwtUser(req);
    enrollmentId = req.path.enrollmentId;
    apiRespone=next;
  }
  Enrollment.getEnrollment(jwtSub, enrollmentId)
    .then(function (response) {
      utils.writeJson(apiRespone, response);
    })
    .catch(function (response) {
      utils.writeJson(apiRespone, response);
    });
};

module.exports.deleteEnrollment = function deleteEnrollment(req, res, next) {

  var jwtSub = '';
  var enrollmentId;
  var apiRespone;
  if (process.env.NODE_ENV == 'development') {
    jwtSub = req.swagger.params['x-int-role'].value;
    enrollmentId = req.swagger.params['enrollmentId'].value;
    apiRespone =res;
  } else {
    jwtSub = getJwtUser(req);
    console.log(req);
    enrollmentId = req.path.enrollmentId;
    apiRespone=next;
  }
  Enrollment.deleteEnrollment(jwtSub, enrollmentId)
    .then(function (response) {
      utils.writeJson(apiRespone, response);
    })
    .catch(function (response) {
      utils.writeJson(apiRespone, response);
    });
};