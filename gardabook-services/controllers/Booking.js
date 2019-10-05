'use strict';

var utils = require('../utils/writer.js');
var Booking = require('../service/BookingService');

module.exports.bookingGET = function bookingGET (req, res, next) {
  var xIntRole = req.swagger.params['x-int-role'].value;
  var userId = req.swagger.params['userId'].value;
  Booking.bookingGET(xIntRole,userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteBooking = function deleteBooking (req, res, next) {
  var xIntRole = req.swagger.params['x-int-role'].value;
  var bookingId = req.swagger.params['bookingId'].value;
  Booking.deleteBooking(xIntRole,bookingId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getOrderById = function getOrderById (req, res, next) {
  var xIntRole = req.swagger.params['x-int-role'].value;
  var bookingId = req.swagger.params['bookingId'].value;
  Booking.getOrderById(xIntRole,bookingId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.submitBooking = function submitBooking (req, res, next) {
  var xIntRole = req.swagger.params['x-int-role'].value;
  var body = req.swagger.params['body'].value;
  Booking.submitBooking(xIntRole,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
