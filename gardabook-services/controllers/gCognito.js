'use strict'
// var utils = require('../utils/writer.js')
var gcognito = require('../service/CognitoService')

module.exports.getCognitoTokenFromGoogleCode = function getCognitoTokenFromGoogleCode(event, context, cb) {
    const code = event.query.code
    // const response = event.Records[0].cf.response;
    // const headers = response.headers;

    gcognito.getCognitoTokenFromGoogleCode(code)
        .then(function (token) {
            var responseCode = 200;
            var response = {
                statusCode: responseCode,
                headers: {
                    "Authorization": token
                }
            };
            // response.status = '200'
            cb(null, {
                response
            });
        })
        .catch(function (gCognitoResp) {
            var responseCode = 401;
            var response = {
                statusCode: responseCode,
                headers: {
                    "Authorization": token
                }
            };
            cb(null, {
                response
            });
        })


}