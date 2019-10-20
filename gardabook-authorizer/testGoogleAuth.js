global.fetch = require('node-fetch')
const jwt = require('jsonwebtoken')
const { google } = require('googleapis')
const AWS = require('aws-sdk')
const AmazonCognitoIdentity = require('amazon-cognito-identity-js')

// TODO: edit for production
// Configs
const client_id =
  '761641708289-pg9crt5nlegplum9d82rbfn4vb643iks.apps.googleusercontent.com'
const client_secret = 'pSr4oh1A3gzh_gYoBZSi-Yz9'
const redirect_uri = 'http://localhost'
const userPoolId = 'ap-southeast-1_Yc1XAOUfh'

const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
  region: 'ap-southeast-1',
})

const cognitoidentity = new AWS.CognitoIdentity({
  apiVersion: '2014-06-30',
  region: 'ap-southeast-1',
})

// oauth2 - google@jeromeng999 @gmail.com

const oauth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uri
)

const createOrSignInUser = async email => {
  try {
    // Check if user is already present
    const listUsersParams = {
      UserPoolId: userPoolId,
      Filter: `email = ${email}`,
      Limit: 'NUMBER_VALUE',
      PaginationToken: 'STRING_VALUE',
    }
    cognitoidentityserviceprovider.listUsers(listUsersParams, function(
      err,
      data
    ) {
      if (err) console.log(err, err.stack)
      // an error occurred
      else console.log(data) // successful response
    })

    // If present, sign in and respond with cognito ID token
    const userPresent = await isUserPresent()

    // If not present, create user with custom attribute 'googleAuth: yes' and 'passwordAuth: no' and 'username: oauth2-google-emailaddress
    const adminCreateUserParams = {
      UserPoolId: userPoolId,
      Username: 'STRING_VALUE' /* required */,
      ClientMetadata: {
        '<StringType>': 'STRING_VALUE',
        /* '<StringType>': ... */
      },
      DesiredDeliveryMediums: [
        SMS | EMAIL,
        /* more items */
      ],
      ForceAliasCreation: true || false,
      MessageAction: RESEND | SUPPRESS,
      TemporaryPassword: 'STRING_VALUE',
      UserAttributes: [
        {
          Name: 'STRING_VALUE' /* required */,
          Value: 'STRING_VALUE',
        },
        /* more items */
      ],
      ValidationData: [
        {
          Name: 'STRING_VALUE' /* required */,
          Value: 'STRING_VALUE',
        },
        /* more items */
      ],
    }

    var params = {
      Password: 'STRING_VALUE' /* required */,
      UserPoolId: 'STRING_VALUE' /* required */,
      Username: 'STRING_VALUE' /* required */,
      Permanent: true || false,
    }
    cognitoidentityserviceprovider.adminSetUserPassword(params, function(
      err,
      data
    ) {
      if (err) console.log(err, err.stack)
      // an error occurred
      else console.log(data) // successful response
    })

    cognitoidentityserviceprovider.adminCreateUser(params, function(err, data) {
      if (err) console.log(err, err.stack)
      // an error occurred
      else console.log(data) // successful response
    })
  } catch (err) {
    return err
  }
}

const getTokens = async code => {
  try {
    const { tokens } = await oauth2Client.getToken(code)
    const { id_token } = tokens
    // No need to verify ID Token JWT as we got the data direct from Google
    const decoded = jwt.decode(id_token)
    const { email } = decoded

    createOrSignInUser(email)

    console.log(`EMAIL is ${email}`)
  } catch (err) {
    console.log('Error!!!')
    console.log(err.response.data.error)
    console.log(err.response.data.error_description)
  }
}

module.exports.authorize = (event, context, cb) => {
  const { body } = event
  const code = body.serverAuthCode
  getTokens(code)
}

// For local test
// const code = '4/sQEkyhTjOxOEUN2eg_wINuf0YcLDiMZcCnJ2Wf9voQdG-Hi4mA_-jDedgL77j_89p_TKxH8p9acsuG6ZKakwLOk'
// getTokens(code)

const isUserPresent = async () => {
  return new Promise((resolve, reject) => {
    var params = {
      UserPoolId: userPoolId /* required */,
      Username: 'oauth2-google@jeromeng999@gmail.com' /* required */,
    }
    cognitoidentityserviceprovider.adminGetUser(params, function(err, data) {
      if (err) {
        // console.log(err, err.stack)
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
}

// isUserPresent().then(res => console.log(res))
const poolData = {
  UserPoolId: userPoolId,
  ClientId: '29llvpvj8sqhh8k5o1781p81k1',
}
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)

const cognitoLogin = (username, password) => {
  var username = username
  var password = password
  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username: username,
    Password: password,
  })
  var userData = {
    Username: username,
    Pool: userPool,
  }
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function(result) {
      var accesstoken = result.getAccessToken().getJwtToken()
      console.log(accesstoken)
    },
    onFailure: function(err) {
      console.log(err)
    },
  })
}

cognitoLogin('asdf', '1qazZAQ!')
