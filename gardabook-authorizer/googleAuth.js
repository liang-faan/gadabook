'use strict';

const jwk = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const request = require('request');

const allowedOidcDiscoveryUrls = ['https://accounts.google.com/.well-known/openid-configuration']

// Generate policy to allow this user on this API:
const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  console.log(authResponse);
  return authResponse;
};

// Reusable Authorizer function, set on `authorizer` field in serverless.yml
module.exports.authorize = (event, context, cb) => {
  console.log('Auth function invoked');
  if (event.authorizationToken) {
    // Remove 'Bearer ' from token:
    var token = event.authorizationToken;
    if (token.startsWith("Bearer") || token.startsWith("bearer")) {
      token = token.substring(6).trim();
    }

    console.log(token);
    // Make a request to the iss + .well-known/jwks.json URL:
    request(
      { url: "https://cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_aBjWtf10v/.well-known/jwks.json", json: true },
      (error, response, body) => {
        // console.log(request.url);
        if (error || response.statusCode !== 200) {
          console.log('Request error:', error);
          cb('Unauthorized Access');
        }
        const keys = body;
        // Based on the JSON of `jwks` create a Pem:
        const k = keys.keys[0];
        const jwkArray = {
          kty: k.kty,
          n: k.n,
          e: k.e,
        };
        const pem = jwkToPem(jwkArray);

        // Verify the token:
        jwk.verify(token, pem, { issuer: iss }, (err, decoded) => {
          if (err) {
            console.log('Unauthorized user:', err.message);
            cb('Unauthorized Access');
          } else {
            cb(null, generatePolicy(decoded.sub, 'Allow', event.methodArn));
          }
        });
      });
  } else {
    console.log('No authorizationToken found in the header.');
    cb('Unauthorized');
  }
};
