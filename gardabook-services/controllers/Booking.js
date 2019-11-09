'use strict';

var utils = require('../utils/writer.js');
const { getJwtUser, validateUserId } = require('../utils/jwtHelper')
var Booking = require('../service/BookingService');

module.exports.getUserBooking = function getUserBooking(req, res, next) {
  var jwtSub = '';
  var userId = '';
  var apiResponse;
  if (process.env.NODE_ENV == 'development') {
    jwtSub = req.swagger.params['x-int-role'].value;
    userId = req.swagger.params['userId'].value;
    apiResponse=res;
  } else {
    console.log(req);
    jwtSub = getJwtUser(req);
    userId = req.query.userId;
    apiResponse=next;
  }

  if (!validateUserId(jwtSub, userId)) {
    utils.writeJson(apiResponse, { ErrorMessage: "No user right to get booking" });
    return
  }

  Booking.getUserBooking(jwtSub, userId)
    .then(function (response) {
      utils.writeJson(apiResponse, response);
    })
    .catch(function (response) {
      utils.writeJson(apiResponse, response);
    });
};

module.exports.deleteBooking = function deleteBooking(req, res, next) {
  var jwtSub = '';
  var bookingId = '';
  var apiResponse;
  if (process.env.NODE_ENV == 'development') {
    jwtSub = req.swagger.params['x-int-role'].value;
    bookingId = req.swagger.params['bookingId'].value;
    apiResponse = res;
  } else {
    console.log(req);
    jwtSub = getJwtUser(req);
    bookingId= req.path.bookingId;
    apiResponse=next;
  }

  Booking.getBooking(jwtSub, bookingId)
    .then(function (response) {

      if (!response) {
        utils.writeJson(apiResponse, { ErrorMessage: "Error gettinng booking" });
      }

      if (response.userId) {
        if (!validateUserId(jwtSub, response.userId)) {
          utils.writeJson(apiResponse, { ErrorMessage: "No user right to get booking" });
          return
        }

        Booking.deleteBooking(jwtSub, bookingId)
        .then(function (response) {
          utils.writeJson(apiResponse, response);
        })
        .catch(function (response) {
          utils.writeJson(apiResponse, response);
        });

        return
      }

      utils.writeJson(apiResponse, response);
    })
    .catch(function (response) {
      utils.writeJson(apiResponse, response);
    });
};

module.exports.getBooking = function getBooking(req, res, next) {
  var jwtSub = '';
  var bookingId = '';
  var apiResponse;
  if (process.env.NODE_ENV == 'development') {
    jwtSub = req.swagger.params['x-int-role'].value;
    bookingId = req.swagger.params['bookingId'].value;
    apiResponse=res;
  } else {
    jwtSub = getJwtUser(req);
    bookingId = req.path.bookingId;
    apiResponse=next;
  }
  Booking.getBooking(jwtSub, bookingId)
    .then(function (response) {
      if (!response) {
        utils.writeJson(apiResponse, { ErrorMessage: "Error gettinng booking" });
      }

      if (response.userId) {
        if (!validateUserId(jwtSub, response.userId)) {
          utils.writeJson(apiResponse, { ErrorMessage: "No user right to get booking" });
          return
        }
      }

      utils.writeJson(apiResponse, response);
    })
    .catch(function (response) {
      utils.writeJson(apiResponse, response);
    });
};

module.exports.createUserBooking = function createUserBooking(req, res, next) {
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
  Booking.createUserBooking(jwtSub, body)
    .then(function (response) {
      utils.writeJson(apiResponse, response);
    })
    .catch(function (response) {
      utils.writeJson(apiResponse, response);
    });
};