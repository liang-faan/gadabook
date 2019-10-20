'use strict';

const { 
  createEnrollment,
  readEnrollment,
  updateEnrollment,
  deleteEnrollment
} = require("../model/entities/enrollment")

const { newUuid } = require("../utils/uuidGenerator")

/**
 * Create an enrollemnt
 * This can only be done by the enrolled user.
 *
 * xIntRole String 
 * body Enrollment Created enrollement object
 * no response value expected for this operation
 **/
exports.createEnrollment = function(xIntRole,body) {
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
 * xIntRole String 
 * providerId String the provider id of enrollment
 * returns List
 **/
exports.getEnrollmentByProviderId = function(xIntRole,providerId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "date" : "2000-01-23",
  "enrollmentId" : 0,
  "provider" : {
    "firstName" : "firstName",
    "lastName" : "lastName",
    "userStatus" : 5,
    "phone" : "phone",
    "userId" : 1,
    "email" : "email",
    "username" : "username"
  },
  "startTime" : "2000-01-23T04:56:07.000+00:00",
  "endTime" : "2000-01-23T04:56:07.000+00:00",
  "catalogue" : {
    "venue" : "venue",
    "catalogueId" : 0,
    "address" : "address",
    "city" : "city",
    "rateUnit" : "Minute",
    "remark" : "remark",
    "provider" : {
      "firstName" : "firstName",
      "lastName" : "lastName",
      "userStatus" : 5,
      "phone" : "phone",
      "userId" : 1,
      "email" : "email",
      "username" : "username"
    },
    "rate" : 5.63737665663332876420099637471139430999755859375,
    "terms" : "terms",
    "name" : "NUS ISS Meeting Room#5",
    "currency" : "SGD",
    "tag" : [ {
      "tagId" : 6,
      "descritpion" : "descritpion",
      "status" : "Active"
    }, {
      "tagId" : 6,
      "descritpion" : "descritpion",
      "status" : "Active"
    } ],
    "status" : "Open"
  },
  "status" : "Booked"
}, {
  "date" : "2000-01-23",
  "enrollmentId" : 0,
  "provider" : {
    "firstName" : "firstName",
    "lastName" : "lastName",
    "userStatus" : 5,
    "phone" : "phone",
    "userId" : 1,
    "email" : "email",
    "username" : "username"
  },
  "startTime" : "2000-01-23T04:56:07.000+00:00",
  "endTime" : "2000-01-23T04:56:07.000+00:00",
  "catalogue" : {
    "venue" : "venue",
    "catalogueId" : 0,
    "address" : "address",
    "city" : "city",
    "rateUnit" : "Minute",
    "remark" : "remark",
    "provider" : {
      "firstName" : "firstName",
      "lastName" : "lastName",
      "userStatus" : 5,
      "phone" : "phone",
      "userId" : 1,
      "email" : "email",
      "username" : "username"
    },
    "rate" : 5.63737665663332876420099637471139430999755859375,
    "terms" : "terms",
    "name" : "NUS ISS Meeting Room#5",
    "currency" : "SGD",
    "tag" : [ {
      "tagId" : 6,
      "descritpion" : "descritpion",
      "status" : "Active"
    }, {
      "tagId" : 6,
      "descritpion" : "descritpion",
      "status" : "Active"
    } ],
    "status" : "Open"
  },
  "status" : "Booked"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

