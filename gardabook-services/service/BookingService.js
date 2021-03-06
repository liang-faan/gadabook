  const { 
  createBooking, 
  readUserBooking,
  readBooking, 
  updateBooking, 
  deleteBooking,
} = require("../model/entities/booking")

const { newUuid } = require("../utils/uuidGenerator")

var _ = require('lodash')

exports.getUserBooking = function(jwtSub, userId) {
  var params = {
    userId: userId,
  }

  return readUserBooking(params)
}

exports.getBooking = function(jwtSub, bookingId) {
  var params = {
    pKey: bookingId,
    sKey: bookingId,
  }

  return readBooking(params)
}

exports.createUserBooking = function(jwtSub, body) {
  var bookingId = newUuid("Booking_")
  var transactionId = newUuid("Transaction_")
  
  var params = {
    pKey: String(bookingId),
    sKey: String(bookingId),
    userId: String(body.userId),
    catalogueId: String(body.catalogueId),
    transactionId: String(transactionId),
    slot: String(body.slot),
    startTime: String(new  Date(body.startTime).getTime()),
    endTime: String(new  Date(body.endTime).getTime()),
    amount: String(body.amount),
    createdAt: String(Date.now()),
    updatedAt: String(Date.now())
  }
  
  return createBooking(params)
}

exports.deleteBooking = function(jwtSub, bookingId) {
  var params = {
    pKey: String(bookingId),
    sKey: String(bookingId)
  }

  return deleteBooking(params)
}

