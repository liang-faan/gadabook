global.fetch = require('node-fetch')
const jwt = require('jsonwebtoken')
const { google } = require('googleapis')
const AWS = require('aws-sdk')
const AmazonCognitoIdentity = require('amazon-cognito-identity-js')

// TODO: edit for production
// Google Configs
const client_id =
  '761641708289-pg9crt5nlegplum9d82rbfn4vb643iks.apps.googleusercontent.com'
const client_secret = 'pSr4oh1A3gzh_gYoBZSi-Yz9'
const redirect_uri = 'http://localhost'

// Cognito Configs
// const userPoolId = 'ap-southeast-1_Yc1XAOUfh' // testgarda
const userPoolId = 'ap-southeast-1_n90l7WmwP' // gardabook
const cognitoClientId = '1av87gafk35mmvmk7g4csu6fr6' // Server clientId
// const cognitoClientId = '4jc0k206hdernuig7hs5sqhrhb' // Mobile clientId
// const cognitoClientId = 'd0or9299ilbul3m29ohq86n1i' // Server clientId
// const cognitoClientId = '29llvpvj8sqhh8k5o1781p81k1' // Mobile clientId
// const cognitoClientId = 'CLIENT_ID_NOT_APPLICABLE' // Not usable. Value used only when made by admin

const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
  region: 'ap-southeast-1',
})

const oauth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uri
)

const isUserPresent = async username => {
  return new Promise((resolve, reject) => {
    var params = {
      UserPoolId: userPoolId,
      Username: username,
    }
    cognitoidentityserviceprovider.adminGetUser(params, function(err, data) {
      if (err) {
        console.log(err, err.stack)
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
}

const getCognitoAccessToken = (username, password) => {
  return new Promise((resolve, reject) => {
    const poolData = {
      UserPoolId: userPoolId,
      ClientId: cognitoClientId,
    }
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      {
        Username: username,
        Password: password,
      }
    )
    var userData = {
      Username: username,
      Pool: userPool,
    }
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function(result) {
        var accesstoken = result.getAccessToken().getJwtToken()
        resolve(accesstoken)
      },
      onFailure: function(err) {
        reject(err)
      },
    })
  })
}

const createGoogleAuthUser = async email => {
  return new Promise((resolve, reject) => {
    const params = {
      UserPoolId: userPoolId,
      Username: `oauth2-google@${email}`,
      TemporaryPassword: '1qazZAQ!',
      UserAttributes: [
        {
          Name: 'email',
          Value: email,
        },
      ],
    }
    cognitoidentityserviceprovider.adminCreateUser(params, function(err, data) {
      if (err) reject(err, err.stack)
      else resolve(data)
    })
  })
}

// Update user status from FORCE_CHANGE_PASSWORD to CONFIRMED
const updateUserPassword = async username => {
  return new Promise((resolve, reject) => {
    var params = {
      Password: '1qazZAQ!',
      UserPoolId: userPoolId,
      Username: username,
      Permanent: true,
    }
    cognitoidentityserviceprovider.adminSetUserPassword(params, function(
      err,
      data
    ) {
      if (err) reject(err, err.stack)
      else resolve(data)
    })
  })
}

const createOrSignInGoogleUser = async email => {
  try {
    // Check if user is already present
    const username = `oauth2-google@${email}`
    const userPresent = await isUserPresent(username)
    // If present, sign in and respond with cognito ID token
    if (userPresent) {
      // TODO: get static password from key store
      const cognitoAccessToken = await getCognitoAccessToken(
        username,
        '1qazZAQ!'
      )
      return cognitoAccessToken
    } else {
      // Username would have been prepended with oauth label
      const createdUser = await createGoogleAuthUser(email)
      const username = createdUser.User.Username
      await updateUserPassword(username)
      const cognitoAccessToken = await getCognitoAccessToken(
        username,
        '1qazZAQ!'
      )
      return cognitoAccessToken
    }
  } catch (err) {
    return err
  }
}

/**
 * Creates or signs in user using Google's oauth2 Authorization Code
 * @param {string} code
 */
const getCognitoTokenFromGoogleCode = async code => {
  // try {
  const { tokens } = await oauth2Client.getToken(code)
  const { id_token } = tokens
  // No need to verify ID Token JWT as we got the data direct from Google
  const decoded = jwt.decode(id_token)
  const { email } = decoded

  const cognitoToken = await createOrSignInGoogleUser(email)

  return cognitoToken
  // } catch (err) {
  //   return err
  //   console.log('Error!!!')
  //   console.log(err.response.data.error)
  //   console.log(err.response.data.error_description)
  // }
}

exports.getCognitoTokenFromGoogleCode = getCognitoTokenFromGoogleCode

// TEST CODE: By pass token exchange to test user sign up/in
const testNewUserFlow = async username => {
  const createdUser = await createGoogleAuthUser(username)
  const createdUsername = createdUser.User.Username
  // Username would have been prepended with oauth label
  await updateUserPassword(createdUsername)
  const cognitoAccessToken = await getCognitoAccessToken(
    createdUsername,
    '1qazZAQ!'
  )
  return cognitoAccessToken
}
createOrSignInGoogleUser('jerome13@example.com')
  // testNewUserFlow('jerome11@example.com')
  .then(res => console.log(res))
  .catch(err => console.log(err))

// const testCognitoAccessToken = async username => {
//   const cognitoAccessToken = await getCognitoAccessToken(username, '1qazZAQ!')
// }
// testCognitoAccessToken('oauth2-google@jerome13@example.com')
//   .then(res => console.log(res))
//   .catch(err => console.log(err))
