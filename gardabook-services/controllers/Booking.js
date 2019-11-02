'use strict';

var utils = require('../utils/writer.js');
var Booking = require('../service/BookingService');

module.exports.getUserBooking = function getUserBooking(req, res, next) {
  var xIntRole = '';
  var userId = '';
  var apiResponse;
  if (process.env.NODE_ENV == 'development') {
    xIntRole = req.swagger.params['x-int-role'].value;
    userId = req.swagger.params['userId'].value;
    apiResponse=res;
  } else {
    console.log(req);
    xIntRole = '';
    userId = req.query.userId;
    apiResponse=next;
  }
  Booking.getUserBooking(xIntRole, userId)
    .then(function (response) {
      utils.writeJson(apiResponse, response);
    })
    .catch(function (response) {
      utils.writeJson(apiResponse, response);
    });
};

module.exports.deleteBooking = function deleteBooking(req, res, next) {
  var xIntRole = '';
  var bookingId = '';
  var apiResponse;
  if (process.env.NODE_ENV == 'development') {
    xIntRole = req.swagger.params['x-int-role'].value;
    bookingId = req.swagger.params['bookingId'].value;
    apiResponse = res;
  } else {
    console.log(req);
    xIntRole = '';
    bookingId= req.pathParameters['bookingId'];
    apiResponse=next;
  }
  Booking.deleteBooking(xIntRole, bookingId)
    .then(function (response) {
      utils.writeJson(apiResponse, response);
    })
    .catch(function (response) {
      utils.writeJson(apiResponse, response);
    });
};

module.exports.getBooking = function getBooking(req, res, next) {
  var xIntRole = '';
  var bookingId = '';
  var apiResponse;
  if (process.env.NODE_ENV == 'development') {
    xIntRole = req.swagger.params['x-int-role'].value;
    bookingId = req.swagger.params['bookingId'].value;
    apiResponse=res;
  } else {
    xIntRole = '';
    bookingId = req.pathParameters['bookingId'];
    apiResponse=next;
  }
  Booking.getBooking(xIntRole, bookingId)
    .then(function (response) {
      utils.writeJson(apiResponse, response);
    })
    .catch(function (response) {
      utils.writeJson(apiResponse, response);
    });
};

module.exports.createUserBooking = function createUserBooking(req, res, next) {
  var xIntRole = '';
  var body;
  var apiResponse;
  if (process.env.NODE_ENV == 'development') {
    xIntRole = req.swagger.params['x-int-role'].value;
    body = req.swagger.params['body'].value;
    apiResponse = res;
  } else {
    // xIntRole = req.params['x-int-role'].value;
    body = req.body;
    apiResponse = next;
  }
  Booking.createUserBooking(xIntRole, body)
    .then(function (response) {
      utils.writeJson(apiResponse, response);
    })
    .catch(function (response) {
      utils.writeJson(apiResponse, response);
    });
};