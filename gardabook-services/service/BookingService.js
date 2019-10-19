  const { 
  generateBookingObject, 
  createBooking, 
  readBooking, 
  updateBooking, 
  deleteBooking,
  deleteUserBooking
} = require("../model/entities/booking")

const { newUuid } = require("../utils/uuidGenerator")

var _ = require('lodash')

exports.getUserBooking = function(xIntRole, userId) {

  var params = {
    userId: userId,
  }

  return readBooking(params)
}

exports.createUserBooking = function(xIntRole, body) {

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

exports.deleteUserBooking = function(xIntRole, userId) {
  var params = {
    pKey: String(userId),
    sKey: String(userId)
  }

  return deleteUserBooking(params)
}

exports.deleteBooking = function(xIntRole, bookingId) {
  var params = {
    pKey: String(bookingId),
    sKey: String(bookingId)
  }

  return deleteBooking(params)
}

