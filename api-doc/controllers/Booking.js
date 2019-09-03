'use strict';

var utils = require('../utils/writer.js');
var Booking = require('../service/BookingService');

module.exports.booking = function booking (req, res, next) {
  var body = req.swagger.params['body'].value;
  Booking.booking(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.bookingGET = function bookingGET (req, res, next) {
  var userId = req.swagger.params['userId'].value;
  Booking.bookingGET(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteOrder = function deleteOrder (req, res, next) {
  var bookingId = req.swagger.params['bookingId'].value;
  Booking.deleteOrder(bookingId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getOrderById = function getOrderById (req, res, next) {
  var bookingId = req.swagger.params['bookingId'].value;
  Booking.getOrderById(bookingId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
