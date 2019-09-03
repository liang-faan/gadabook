'use strict';


/**
 * Place an booking
 * 
 *
 * body Booking book for the facility
 * returns Booking
 **/
exports.booking = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "amount" : 6.02745618307040320615897144307382404804229736328125,
  "submitDate" : "2000-01-23T04:56:07.000+00:00",
  "bookingDate" : "2000-01-23T04:56:07.000+00:00",
  "availability" : {
    "date" : "2000-01-23",
    "availablityId" : 0,
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
    }
  },
  "paymentDate" : "2000-01-23T04:56:07.000+00:00",
  "complete" : false,
  "user" : {
    "firstName" : "firstName",
    "lastName" : "lastName",
    "userStatus" : 5,
    "phone" : "phone",
    "userId" : 1,
    "email" : "email",
    "username" : "username"
  },
  "bookingId" : 0,
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
  "createDate" : "2000-01-23T04:56:07.000+00:00",
  "status" : "New"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Find booking history by user id
 * Returns booking list of user's
 *
 * userId Long ID of user
 * returns Booking
 **/
exports.bookingGET = function(userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "amount" : 6.02745618307040320615897144307382404804229736328125,
  "submitDate" : "2000-01-23T04:56:07.000+00:00",
  "bookingDate" : "2000-01-23T04:56:07.000+00:00",
  "availability" : {
    "date" : "2000-01-23",
    "availablityId" : 0,
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
    }
  },
  "paymentDate" : "2000-01-23T04:56:07.000+00:00",
  "complete" : false,
  "user" : {
    "firstName" : "firstName",
    "lastName" : "lastName",
    "userStatus" : 5,
    "phone" : "phone",
    "userId" : 1,
    "email" : "email",
    "username" : "username"
  },
  "bookingId" : 0,
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
  "createDate" : "2000-01-23T04:56:07.000+00:00",
  "status" : "New"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete purchase order by ID
 * For valid response try integer IDs with positive integer value.         Negative or non-integer values will generate API errors
 *
 * bookingId Long ID of the order that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteOrder = function(bookingId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Find booking by ID
 * For valid response try integer IDs with value >= 1 and <= 10.         Other values will generated exceptions
 *
 * bookingId Long ID of booking that needs to be fetched
 * returns Booking
 **/
exports.getOrderById = function(bookingId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "amount" : 6.02745618307040320615897144307382404804229736328125,
  "submitDate" : "2000-01-23T04:56:07.000+00:00",
  "bookingDate" : "2000-01-23T04:56:07.000+00:00",
  "availability" : {
    "date" : "2000-01-23",
    "availablityId" : 0,
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
    }
  },
  "paymentDate" : "2000-01-23T04:56:07.000+00:00",
  "complete" : false,
  "user" : {
    "firstName" : "firstName",
    "lastName" : "lastName",
    "userStatus" : 5,
    "phone" : "phone",
    "userId" : 1,
    "email" : "email",
    "username" : "username"
  },
  "bookingId" : 0,
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
  "createDate" : "2000-01-23T04:56:07.000+00:00",
  "status" : "New"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

