import axios from 'axios'

import { rootUrl } from '../settings'
import { BOOKING_UPDATE_BOOKING_LIST } from './types'

const userId = 'User_BD49B658-122B-44BE-8B2C-60846EC5864C'
export const getBookingList = () => dispatch => {
  axios.get(`${rootUrl}/booking/?userId=${userId}`).then(res => {
    dispatch({
      type: BOOKING_UPDATE_BOOKING_LIST,
      payload: res.data.bookings,
    })
  })
}
