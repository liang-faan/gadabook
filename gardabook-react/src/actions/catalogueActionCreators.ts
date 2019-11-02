import axios from 'axios'

import { rootUrl } from '../settings'
import { CATALOGUE_UPDATE_CATALOGUE_LIST } from './types'

export const getCatalogueList = () => dispatch => {
  axios.get(`${rootUrl}/catalogue`).then(res => {
    dispatch({
      type: CATALOGUE_UPDATE_CATALOGUE_LIST,
      payload: res.data.catalogues,
    })
  })
}
