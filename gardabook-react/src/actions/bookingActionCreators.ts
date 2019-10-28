import axios from 'axios'

import { rootUrl } from '../settings'
import { BOOKING_UPDATE_BOOKING_LIST } from './types'

export const getBookingList = () => dispatch => {
  axios.get(`${rootUrl}/booking`).then(res => {
    dispatch({
      type: BOOKING_UPDATE_BOOKING_LIST,
      payload: res.data.bookings,
    })
  })
}
