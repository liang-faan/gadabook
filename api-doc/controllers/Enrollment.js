'use strict';

var utils = require('../utils/writer.js');
var Enrollment = require('../service/EnrollmentService');

module.exports.createEnrollment = function createEnrollment (req, res, next) {
  var body = req.swagger.params['body'].value;
  Enrollment.createEnrollment(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getEnrollmentByProviderId = function getEnrollmentByProviderId (req, res, next) {
  var providerId = req.swagger.params['providerId'].value;
  Enrollment.getEnrollmentByProviderId(providerId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
