import axios from 'axios'
import jwtDecode from 'jwt-decode'

import { rootUrl } from '../settings'
import { BOOKING_UPDATE_BOOKING_LIST } from './types'

export const getBookingList = () => async (dispatch, getState) => {
  const { cognitoToken } = getState().auth
  const decoded = jwtDecode(cognitoToken)
  // TODO: use ac
  const { sub } = decoded
  // const sub = 'BD49B658-122B-44BE-8B2C-60846EC5864C'
  const headers = { Authorization: `Bearer ${cognitoToken}` }
  let bookingsRes = await axios.get(
    `${rootUrl}/booking/getBookingByUserId?userId=User_${sub}`,
    { headers }
  )

  const bookings = bookingsRes.data.bookings.map(async booking => {
    const catalogueRes = await axios.get(
      `${rootUrl}/catalogue/getCatalogueById/${booking.catalogueId}`,
      { headers }
    )
    booking.catalogueData = catalogueRes.data
    const availabilityRes = await axios.get(
      `${rootUrl}/catalogue/readCatalogueByAvailabilityId/${booking.catalogueData.availabilityId}`,
      { headers }
    )
    booking.catalogueData.availabilityData = availabilityRes.data
    return booking
  })

  Promise.all(bookings).then(bookings => {
    dispatch({
      type: BOOKING_UPDATE_BOOKING_LIST,
      payload: bookings,
    })
  })
}

export const createBooking = () => (dispatch, getState) => {
  const { cognitoToken } = getState().auth
  const decoded = jwtDecode(cognitoToken)
  const headers = { Authorization: `Bearer ${cognitoToken}` }
  const data = {
    userId: `User_${decoded.sub}`,
    amount: 6.027456183070403,
    catalogueId: 'Catalogue_99088906-9357-4BA1-BB25-16F21306978E',
    date: '2000-01-23T04:56:07.000+00:00',
    time: '2000-01-23T04:56:07.000+00:00',
    slot: 2,
    startTime: '2000-01-23T04:56:07.000+00:00',
    endTime: '2000-01-23T04:56:07.000+00:00',
  }
  axios.post('https://api.gardabook.com/v1/booking/createUserBooking', {
    headers,
    data,
  })
  // dispatch(getBookingList())
}
