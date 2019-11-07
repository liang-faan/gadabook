import axios from 'axios'
import { Auth } from 'aws-amplify'

import { rootUrl } from '../settings'
import {
  UPDATE_LOADING_SCREEN,
  UPDATE_SIGNIN_TYPE,
  UPDATE_COGNITO_TOKEN,
  USE_GOOGLE_LOGIN,
} from './types'
import { webClientId } from '../settings'

export const updateShowGoogleLogin = showGoogleLogin => {
  return {
    type: USE_GOOGLE_LOGIN,
    payload: showGoogleLogin,
  }
}

const getCognitoTokenFromGoogleCode = code => dispatch => {
  dispatch({
    type: UPDATE_LOADING_SCREEN,
    payload: true,
  })
  axios
    .get(`${rootUrl}/cognito/getCognitoTokenFromGoogleCode?code=${code}`)
    .then(res => {
      const cognitoToken = res.data.response.headers.Authorization
      console.log(`JER: ${cognitoToken}`)
      dispatch({
        type: UPDATE_COGNITO_TOKEN,
        payload: cognitoToken,
      })
      dispatch({
        type: UPDATE_SIGNIN_TYPE,
        payload: 'GOOGLE',
      })
      console.log(res)
      dispatch({
        type: UPDATE_LOADING_SCREEN,
        payload: false,
      })
    })
}

export const loginWithGoogle = () => {
  const params = {
    scopes: 'profile email',
    webClientId: webClientId,
    offline: true,
  }
  const onSuccess = data => {
    const code = data.serverAuthCode
    getCognitoTokenFromGoogleCode(code)
  }
  const onFailure = (msg: Object) => {
    console.log('FAILED LOGIN')
    console.log(msg)
  }
  window.plugins.googleplus.login(params, onSuccess, onFailure)
}

export const signout = () => (dispatch, getState) => {
  const { cognitoToken, signinType } = getState().auth
  // TODO: Update logout path (whole of below)
  const headers = { Authorization: `Bearer ${cognitoToken}` }
  const generalSignout = () => {
    return axios.get(`${rootUrl}/user/userLogout`, { headers }).then(res => {
      dispatch({
        type: UPDATE_COGNITO_TOKEN,
        payload: '',
      })
      dispatch({
        type: UPDATE_SIGNIN_TYPE,
        payload: 'COGNITO',
      })
    })
  }
  if (signinType === 'GOOGLE') {
    generalSignout()
  } else if (signinType === 'COGNITO') {
    generalSignout().then(() => {
      Auth.currentSession()
        .then(() => {
          Auth.signOut()
            .then(data => {
              updateShowGoogleLogin(true)
              console.log(data)
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    })
  }
}

export const updateCognitoToken = token => {
  return {
    type: UPDATE_COGNITO_TOKEN,
    payload: token,
  }
}
