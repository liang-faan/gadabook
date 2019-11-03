'use strict'
var utils = require('../utils/writer.js')
var gcognito = require('../service/CognitoService')

module.exports.getCognitoTokenFromGoogleCode = function getCognitoTokenFromGoogleCode(
    req,
    res,
    next
) {
    const code = req.query.code
    gcognito
        .getCognitoTokenFromGoogleCode(code)
        .then(function (response) {
            next(null,
                "isBase64Encoded": false, // Set to `true` for binary support.
                "statusCode": 200,
                "headers": {
                    "Authorization": response
                }
            );
        })
        .catch(function (response) {
            next(
                null,
                "isBase64Encoded": false, // Set to `true` for binary support.
                "statusCode": 404,
                "headers": {
                    "Authorization": null
                }
            );
        })
}