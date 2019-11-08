'use strict';

const { 
  createEnrollment,
  readUserEnrollment,
  readEnrollment,
  updateEnrollment,
  deleteEnrollment
} = require("../model/entities/enrollment")

const { newUuid } = require("../utils/uuidGenerator")

/**
 * Create an enrollemnt
 * This can only be done by the enrolled user.
 *
 * jwtSub String 
 * body Enrollment Created enrollement object
 * no response value expected for this operation
 **/
exports.createEnrollment = function(jwtSub,body) {
  var enrollmentId = newUuid("Enrollment_")
  
  var params = {
    pKey: String(enrollmentId),
    sKey: String(enrollmentId),
    fee: String(body.fee),
    expiryDate: String(body.expiryDate),
    userId: String(body.userId),
    catalogueId: String(body.catalogueId),
    createdAt: String(Date.now()),
    updatedAt: String(Date.now())
  }

  return createEnrollment(params)
}


/**
 * get enrollemnt by providerId
 * This can only be done by the enrolled user.
 *
 * jwtSub String 
 * providerId String the provider id of enrollment
 * returns List
 **/
exports.getUserEnrollment = function(jwtSub, userId) {
  var params = {
    userId: userId,
  }

  return readUserEnrollment(params)
}

exports.getEnrollment = function(jwtSub, enrollmentId) {
  var params = {
    pKey: enrollmentId,
    sKey: enrollmentId
  }

  return readEnrollment(params)
}

exports.deleteEnrollment = function(jwtSub, enrollmentId) {
  var params = {
    pKey: enrollmentId,
    sKey: enrollmentId
  }

  return deleteEnrollment(params)
}