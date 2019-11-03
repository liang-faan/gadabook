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
    .then(function(response) {
      utils.writeJson(res, response)
    })
    .catch(function(response) {
      utils.writeJson(res, response)
    })
}
