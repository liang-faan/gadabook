'use strict';

// Public API
module.exports.publicEndpoint = (event, context, cb) => {
  cb(null, {
    message: 'Welcome to our Public API!'
  });
};

// Private API
module.exports.privateEndpoint = (event, context, cb) => {

  var responseBody = {
    "key3": "value3",
    "key2": "value2",
    "key1": "Welcome to private API"
  };

  var response = {
    "statusCode": 200,
    "headers": {
      "my_header": "my_value"
    },
    "body": JSON.stringify(responseBody),
    "isBase64Encoded": false
  };
  cb(null, response);
};