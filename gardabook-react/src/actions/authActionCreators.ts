import axios from 'axios'
import { Auth } from 'aws-amplify'

import { rootUrl } from '../settings'
import {
  UPDATE_LOADING_SCREEN,
  UPDATE_SIGNIN_TYPE,
  UPDATE_COGNITO_TOKEN,
  USE_GOOGLE_LOGIN,
  UPDATE_LOGOUT_FLAG,
} from './types'
import { webClientId } from '../settings'

export const updateShowGoogleLogin = showGoogleLogin => {
  console.log('authActionCreators: updateShowGoogleLogin' + showGoogleLogin)
  return {
    type: USE_GOOGLE_LOGIN,
    payload: showGoogleLogin,
  }
}

export const updateLogoutFlag = status => {
  console.log('authActionCreators: updateLogoutFlag' + status)
  return {
    type: UPDATE_LOGOUT_FLAG,
    payload: status,
  }
}

export const loginWithGoogle = () => (dispatch, getState) => {
  console.log('authActionCreators: loginWithGoogle')
  dispatch({
    type: UPDATE_LOADING_SCREEN,
    payload: true,
  })
  const params = {
    scopes: 'profile email',
    webClientId: webClientId,
    offline: true,
  }
  const onSuccess = data => {
    const code = data.serverAuthCode
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
        console.log(JSON.stringify(getState()))
      })
  }
  const onFailure = (msg: Object) => {
    console.log('FAILED LOGIN')
    console.log(msg)
  }
  window.plugins.googleplus.login(params, onSuccess, onFailure)
}

export const signout = () => (dispatch, getState) => {
  console.log('authActionCreators: signout')
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
      dispatch(updateLogoutFlag(true))
      setTimeout(() => {
        dispatch(updateLogoutFlag(false))
      }, 200)
      setTimeout(() => dispatch(updateShowGoogleLogin(true)), 1000)
    })
  }
  if (signinType === 'GOOGLE') {
    generalSignout()
  } else if (signinType === 'COGNITO') {
    generalSignout().then(() => {
      Auth.signOut()
        .then(data => {
          console.log(data)
        })
        .catch(err => console.log(err))
    })
  }
}

export const updateCognitoToken = token => {
  console.log('authActionCreators: updateCognitoToken')
  return {
    type: UPDATE_COGNITO_TOKEN,
    payload: token,
  }
}
