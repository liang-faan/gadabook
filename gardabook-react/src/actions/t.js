const axios = require('axios')
const jwtDecode = require('jwt-decode')

const cognitoToken =
  'eyJraWQiOiJzb3h3N09vQVcwclpBZmNEeTB3MGJGVlVLUWQ0YktpXC80RUhaRFc5aVgzZz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzMDcyODVmZi03OGQ2LTQ0MmItOTRhMC1mZmNjYWUyOGYyYjMiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0xX245MGw3V213UCIsInBob25lX251bWJlcl92ZXJpZmllZCI6ZmFsc2UsImNvZ25pdG86dXNlcm5hbWUiOiJqZXJvbWVuZzg4OEBnbWFpbC5jb20iLCJhdWQiOiI2MWlvYWg1bmZjZjlkZGllYW1wY2xxNTNqOCIsImV2ZW50X2lkIjoiMmRjMjZkOGYtMjc5Yi00M2YzLTk1NDMtNjI4M2E1MWI1YzZhIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE1NzMyNTAwODksInBob25lX251bWJlciI6Iis2NTk2ODgwMzIwIiwiZXhwIjoxNTczMjUzNjg5LCJpYXQiOjE1NzMyNTAwODksImVtYWlsIjoiamVyb21lbmc4ODhAZ21haWwuY29tIn0.Xn0mk7AUWCdzallt56E3BWedSOh3SXQXRjxB6ZjkuK61tA05_-1wusYZ559T907TztVF9CI1HxnH-UJGODIltyLe7SHotH2f9HmveL0av_f88QjJHRvB6gnJ9FVtIknmaH0rLq5WdgqNX7rHAtySUVjJl_QY0pm58M13PgB5I9kPGx-ymrViPzqJ1Lpkg-MtDpGBn51Jpdbfbv17x0zhMoQUzQBf7snj_okGzdCXBe-Jh2v0BtyZC9Jc13ysn8jd7YjRLwrg_2Z8nozjEcjbF1Oqwk6VoA6IbIK04CE98_cCIPJ9ZMhs4aJdKg1U3eRcxt9f5f7X-5Irm4XzlIAdrA'
// const sub = '307285ff-78d6-442b-94a0-ffccae28f2b3'

const createBooking = () => {
  // const { cognitoToken } = getState().auth
  const decoded = jwtDecode(cognitoToken)
  const headers = { Authorization: `Bearer ${cognitoToken}` }
  const data = {
    userId: `User_${decoded.sub}`,
    amount: 6.027456183070403,
    catalogueId: 'Catalogue_12daa232-b2a9-4ca2-bb88-96a5a89bc9ca',
    date: '2000-01-23T04:56:07.000+00:00',
    time: '2000-01-23T04:56:07.000+00:00',
    slot: 3,
    startTime: '2000-01-23T04:56:07.000+00:00',
    endTime: '2000-01-23T04:56:07.000+00:00',
  }
  axios
    .post('https://api.gardabook.com/v1/booking/createUserBooking', data, {
      headers,
    })
    .then(res => console.log(res))
  // dispatch(getBookingList())
}

createBooking()
