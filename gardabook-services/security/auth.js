'use strict'

const jwk = require('jsonwebtoken')
const jwkToPem = require('jwk-to-pem')
const request = require('request')
//require user service


// For AWS Cognito: https://cognito-idp.<region>.amazonaws.com/<user pool id>
const iss ='https://cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_n90l7WmwP'

// Generate policy to allow this user on this API:
const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {}
  authResponse.principalId = principalId
  if (effect && resource) {
    const policyDocument = {}
    policyDocument.Version = '2012-10-17'
    policyDocument.Statement = []
    const statementOne = {}
    statementOne.Action = 'execute-api:Invoke'
    statementOne.Effect = effect
    statementOne.Resource = resource
    policyDocument.Statement[0] = statementOne
    authResponse.policyDocument = policyDocument
  }
  console.log(authResponse)
  return authResponse
}

// Reusable Authorizer function, set on `authorizer` field in serverless.yml
module.exports.authorize = (event, context, callback) => {
  console.log('Auth function invoked')
  var requestPath = event.requestPath;
  var sub;
  var jti;
  if (event.authorizationToken) {
    // Remove 'Bearer ' from token:
    var token = event.authorizationToken
    if (token.startsWith('Bearer') || token.startsWith('bearer')) {
      token = token.substring(6).trim()
    }

    var options = {};
    var decodeToken = jwk.decode(token,options);
    var keyId= decodeToken.header.kid;
    // console.log(token)
    // Make a request to the iss + .well-known/jwks.json URL:
    request({
        url: `${iss}/.well-known/jwks.json`,
        json: true
      },
      (error, response, body) => {
        console.log(request.url);
        if (error || response.statusCode !== 200) {
          console.log('Request error:', error)
          callback('Unauthorized Access')
        }
        const keys = body
        // Based on the JSON of `jwks` create a Pem:
        const k = keys.keys[0];
        if(k.kid != keyId){
          keys.forEach((key, index) => {
            if(key.kid = keyId){
              k = key;
              break;
            }
          });
        }
        const jwkArray = {
          kty: k.kty,
          n: k.n,
          e: k.e,
        }
        const pem = jwkToPem(jwkArray)

        // Verify the token:
        jwk.verify(token, pem, {issuer: iss}, (err, decoded) => {
          if (err) {
            console.log('Unauthorized user:', err.message)
            callback('Unauthorized Access')
          } else {
            jti = decoded.jti;
            sub = decoded.sub;
            console.log(decoded.jti) //jwt token id
            console.log(decoded.sub) //sub id
            console.log(decoded);
            if (requestPath.includes('userLogout')) {
              logout(token, jti, sub);
              callback(null, generatePolicy(decoded.sub, 'Allow', event.methodArn))
            } else {
              if (verifyRevokeToken(token, jti, sub)) {
                callback('Unauthorized Access')
              }
              callback(null, generatePolicy(decoded.sub, 'Allow', event.methodArn))
            }
          }
        })
      }
    )
  } else {
    console.log('No authorizationToken found in the header.')
    callback('Unauthorized')
  }
}

function logout(token, jti, sub) {
  //insert
//need to store revoke token in dynamodb
//pkey: RevokeToken_ + jti
//skey: User_ +sub
// attribute token: token

  console.log(decodedToken.jti)
}

function verifyRevokeToken(token, jti, sub) {
  //fetch
 //skey: User_ +sub
//pkey: RevokeToken_ + jti

  console.log(decodedToken.jti);
  return false;
}