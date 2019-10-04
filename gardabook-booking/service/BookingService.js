  
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();
var _ = require('lodash');

/**
 * Find booking history by user id
 * Returns booking list of user's
 *
 * xIntRole String 
 * userId Long ID of user
 * returns Booking
 **/
exports.bookingGET = function(xIntRole,userId) {

  var params = {
    TableName: "gardabook-develop",
    KeyConditionExpression: "#p = :id and #s begins_with :b",
    ExpressionAttributeNames: {
        "#p": "partitionKey",
        "#s": "sortKey"
    },
    ExpressionAttributeValues: {
      ":id": res.userId,
      ":b": "Booking_",
    },
    ReturnConsumedCapacity: "TOTAL"  
  };

  var promise = dynamodb.getItem(params, function(err, data) {
      if (err) {
          console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
      } else {
          console.log("Query succeeded.");
          res.json({ data: booking });
      }
  });
  // return new Promise(function(resolve, reject) {
//     var examples = {};
//     examples['application/json'] = {
//   "amount" : 6.02745618307040320615897144307382404804229736328125,
//   "submitDate" : "2000-01-23T04:56:07.000+00:00",
//   "bookingDate" : "2000-01-23T04:56:07.000+00:00",
//   "availability" : {
//     "date" : "2000-01-23",
//     "availablityId" : 0,
//     "catalogue" : {
//       "venue" : "venue",
//       "catalogueId" : 0,
//       "address" : "address",
//       "city" : "city",
//       "rateUnit" : "Minute",
//       "remark" : "remark",
//       "provider" : {
//         "firstName" : "firstName",
//         "lastName" : "lastName",
//         "userStatus" : 5,
//         "phone" : "phone",
//         "userId" : 1,
//         "email" : "email",
//         "username" : "username"
//       },
//       "rate" : 5.63737665663332876420099637471139430999755859375,
//       "terms" : "terms",
//       "name" : "NUS ISS Meeting Room#5",
//       "currency" : "SGD",
//       "tag" : [ {
//         "tagId" : 6,
//         "descritpion" : "descritpion",
//         "status" : "Active"
//       }, {
//         "tagId" : 6,
//         "descritpion" : "descritpion",
//         "status" : "Active"
//       } ],
//       "status" : "Open"
//     }
//   },
//   "paymentDate" : "2000-01-23T04:56:07.000+00:00",
//   "complete" : false,
//   "user" : {
//     "firstName" : "firstName",
//     "lastName" : "lastName",
//     "userStatus" : 5,
//     "phone" : "phone",
//     "userId" : 1,
//     "email" : "email",
//     "username" : "username"
//   },
//   "bookingId" : 0,
//   "catalogue" : {
//     "venue" : "venue",
//     "catalogueId" : 0,
//     "address" : "address",
//     "city" : "city",
//     "rateUnit" : "Minute",
//     "remark" : "remark",
//     "provider" : {
//       "firstName" : "firstName",
//       "lastName" : "lastName",
//       "userStatus" : 5,
//       "phone" : "phone",
//       "userId" : 1,
//       "email" : "email",
//       "username" : "username"
//     },
//     "rate" : 5.63737665663332876420099637471139430999755859375,
//     "terms" : "terms",
//     "name" : "NUS ISS Meeting Room#5",
//     "currency" : "SGD",
//     "tag" : [ {
//       "tagId" : 6,
//       "descritpion" : "descritpion",
//       "status" : "Active"
//     }, {
//       "tagId" : 6,
//       "descritpion" : "descritpion",
//       "status" : "Active"
//     } ],
//     "status" : "Open"
//   },
//   "createDate" : "2000-01-23T04:56:07.000+00:00",
//   "status" : "New"
// };
//     if (Object.keys(examples).length > 0) {
//       resolve(examples[Object.keys(examples)[0]]);
//     } else {
//       resolve();
//     }
//   });
};


/**
 * Delete purchase order by ID
 * For valid response try integer IDs with positive integer value.         Negative or non-integer values will generate API errors
 *
 * xIntRole String 
 * bookingId Long ID of the order that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteBooking = function(xIntRole,bookingId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Find booking by ID
 * For valid response try integer IDs with value >= 1 and <= 10.         Other values will generated exceptions
 *
 * xIntRole String 
 * bookingId Long ID of booking that needs to be fetched
 * returns Booking
 **/
exports.getOrderById = function(xIntRole,bookingId) {
  
//   return new Promise(function(resolve, reject) {
//     var examples = {};
//     examples['application/json'] = {
//   "amount" : 6.02745618307040320615897144307382404804229736328125,
//   "submitDate" : "2000-01-23T04:56:07.000+00:00",
//   "bookingDate" : "2000-01-23T04:56:07.000+00:00",
//   "availability" : {
//     "date" : "2000-01-23",
//     "availablityId" : 0,
//     "catalogue" : {
//       "venue" : "venue",
//       "catalogueId" : 0,
//       "address" : "address",
//       "city" : "city",
//       "rateUnit" : "Minute",
//       "remark" : "remark",
//       "provider" : {
//         "firstName" : "firstName",
//         "lastName" : "lastName",
//         "userStatus" : 5,
//         "phone" : "phone",
//         "userId" : 1,
//         "email" : "email",
//         "username" : "username"
//       },
//       "rate" : 5.63737665663332876420099637471139430999755859375,
//       "terms" : "terms",
//       "name" : "NUS ISS Meeting Room#5",
//       "currency" : "SGD",
//       "tag" : [ {
//         "tagId" : 6,
//         "descritpion" : "descritpion",
//         "status" : "Active"
//       }, {
//         "tagId" : 6,
//         "descritpion" : "descritpion",
//         "status" : "Active"
//       } ],
//       "status" : "Open"
//     }
//   },
//   "paymentDate" : "2000-01-23T04:56:07.000+00:00",
//   "complete" : false,
//   "user" : {
//     "firstName" : "firstName",
//     "lastName" : "lastName",
//     "userStatus" : 5,
//     "phone" : "phone",
//     "userId" : 1,
//     "email" : "email",
//     "username" : "username"
//   },
//   "bookingId" : 0,
//   "catalogue" : {
//     "venue" : "venue",
//     "catalogueId" : 0,
//     "address" : "address",
//     "city" : "city",
//     "rateUnit" : "Minute",
//     "remark" : "remark",
//     "provider" : {
//       "firstName" : "firstName",
//       "lastName" : "lastName",
//       "userStatus" : 5,
//       "phone" : "phone",
//       "userId" : 1,
//       "email" : "email",
//       "username" : "username"
//     },
//     "rate" : 5.63737665663332876420099637471139430999755859375,
//     "terms" : "terms",
//     "name" : "NUS ISS Meeting Room#5",
//     "currency" : "SGD",
//     "tag" : [ {
//       "tagId" : 6,
//       "descritpion" : "descritpion",
//       "status" : "Active"
//     }, {
//       "tagId" : 6,
//       "descritpion" : "descritpion",
//       "status" : "Active"
//     } ],
//     "status" : "Open"
//   },
//   "createDate" : "2000-01-23T04:56:07.000+00:00",
//   "status" : "New"
// };
//     if (Object.keys(examples).length > 0) {
//       resolve(examples[Object.keys(examples)[0]]);
//     } else {
//       resolve();
//     }
//   });
}


/**
 * Place an booking
 * 
 *
 * xIntRole String 
 * body Booking book for the facility
 * returns Booking
 **/
exports.submitBooking = function(xIntRole,body) {
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

