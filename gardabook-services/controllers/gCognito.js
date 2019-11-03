'use strict';
var gcognito=require("../service/CognitoService");

module.exports.getCognitoTokenFromGoogleCode = function getCognitoTokenFromGoogleCode (req, res, next){
    gcognito.getCognitoTokenFromGoogleCode(req)
    .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
}