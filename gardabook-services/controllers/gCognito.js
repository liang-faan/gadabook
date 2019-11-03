'use strict'
// var utils = require('../utils/writer.js')
var gcognito = require('../service/CognitoService')

module.exports.getCognitoTokenFromGoogleCode = function getCognitoTokenFromGoogleCode(req,res,cb) {
    const code = req.query.code
    const response = req.Records[0].cf.response;
    const headers = response.headers;
    gcognito.getCognitoTokenFromGoogleCode(code)
        .then(function (token) {
            headers['Authorization']=[{key:"Authorization", value: token}];
            // response.status = '200'
            cb(null, {response});
        })
        .catch(function (gCognitoResp) {
            cb(null, {response});
        })
        

}