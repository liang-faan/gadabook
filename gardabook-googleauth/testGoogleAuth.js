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

const createOrSignInUser = async username => {
  try {
    // Check if user is already present
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
      ClientId: '29llvpvj8sqhh8k5o1781p81k1',
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

        {
          Name: 'custom:googleAuth',
          Value: 'yes',
        },
        {
          Name: 'custom:passwordAuth',
          Value: 'yes',
        },
      ],
    }
    cognitoidentityserviceprovider.adminCreateUser(params, function(err, data) {
      if (err) reject(err, err.stack)
      else resolve(data)
    })
  })
}

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

// getCognitoAccessToken('asdf', '1qazZAQ!').then(res => console.log(res))
// isUserPresent().then(res => console.log(res))
// createGoogleAuthUser('asdf@example.com').then(res => console.log(res))
// updateUserPassword('oauth2-google@asdf@example.com').then(res =>
//   console.log(res)
// )

// For local test
// const code = '4/sQEkyhTjOxOEUN2eg_wINuf0YcLDiMZcCnJ2Wf9voQdG-Hi4mA_-jDedgL77j_89p_TKxH8p9acsuG6ZKakwLOk'
// getTokens(code)

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

testNewUserFlow('superman@examddple.comddm')
  .then(res => console.log(res))
  .catch(err => console.log(err))
