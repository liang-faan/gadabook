import axios from 'axios'

import { rootUrl } from '../settings'
import { CATALOGUE_UPDATE_CATALOGUE_LIST } from './types'

export const getCatalogueList = () => (dispatch, getState) => {
  console.log('catalogueActionCreators: getCatalogueList')
  const { cognitoToken } = getState().auth
  const headers = { Authorization: `Bearer ${cognitoToken}` }
  axios.get(`${rootUrl}/catalogue/getAllCatalogues`, { headers }).then(res => {
    dispatch({
      type: CATALOGUE_UPDATE_CATALOGUE_LIST,
      payload: res.data.catalogues,
    })
  })
}
