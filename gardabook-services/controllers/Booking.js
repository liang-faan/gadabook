'use strict';

var utils = require('../utils/writer.js');
var Booking = require('../service/BookingService');

module.exports.getUserBooking = function getUserBooking(req, res, next) {
  var xIntRole = '';
  var userId = '';
  if (process.env.NODE_ENV == 'development') {
    xIntRole = req.swagger.params['x-int-role'].value;
    userId = req.swagger.params['userId'].value;
  } else {
    xIntRole = '';
    userId = req.params['userId'].value;
  }
  Booking.getUserBooking(xIntRole, userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteBooking = function deleteBooking(req, res, next) {
  var xIntRole = '';
  var bookingId = '';
  if (process.env.NODE_ENV == 'development') {
    xIntRole = req.swagger.params['x-int-role'].value;
    bookingId = req.swagger.params['bookingId'].value;
  } else {
    xIntRole = '';
    bookingId = req.params['bookingId'].value;
  }
  Booking.deleteBooking(xIntRole, bookingId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getBooking = function getBooking(req, res, next) {
  var xIntRole = '';
  var bookingId = '';
  if (process.env.NODE_ENV == 'development') {
    xIntRole = req.swagger.params['x-int-role'].value;
    bookingId = req.swagger.params['bookingId'].value;
  } else {
    xIntRole = req.params['x-int-role'].value;
    bookingId = req.params['bookingId'].value;
  }
  Booking.getBooking(xIntRole, bookingId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.createUserBooking = function createUserBooking(req, res, next) {
  var xIntRole = '';
  var body;
  if (process.env.NODE_ENV == 'development') {
    xIntRole = req.swagger.params['x-int-role'].value;
    body = req.swagger.params['body'].value;
  } else {
    xIntRole = req.params['x-int-role'].value;
    body = req.params['body'].value;
  }
  Booking.createUserBooking(xIntRole, body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};