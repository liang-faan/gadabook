'use strict';


/**
 * Create an enrollemnt
 * This can only be done by the enrolled user.
 *
 * body Enrollment Created enrollement object
 * no response value expected for this operation
 **/
exports.createEnrollment = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * get enrollemnt by providerId
 * This can only be done by the enrolled user.
 *
 * providerId String the provider id of enrollment
 * returns List
 **/
exports.getEnrollmentByProviderId = function(providerId) {
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

