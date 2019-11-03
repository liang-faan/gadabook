import axios from 'axios'

import { rootUrl } from '../settings'
import {
  UPDATE_LOADING_SCREEN,
  UPDATE_SIGNIN_STATUS,
  STORE_COGNITO_TOKEN,
} from './types'

export const getCognitoToken = code => (dispatch, getState) => {
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
        type: STORE_COGNITO_TOKEN,
        payload: cognitoToken,
      })
      dispatch({
        type: UPDATE_SIGNIN_STATUS,
        payload: true,
      })
      console.log(res)
      dispatch({
        type: UPDATE_LOADING_SCREEN,
        payload: false,
      })
    })
}
