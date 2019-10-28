const bookingData = require('./booking')
const catalogueData = require('./catalogue')
const enrollmentData = require('./enrollment')
const userData = require('./user')

// Mock data configs
const mockData1 = {
  listBooking: bookingData.listData.data1,
  getBooking: bookingData.getData.data1,
  postBooking: bookingData.postData.data1,
  deleteBooking: bookingData.deleteData.data1,

  listCatalogue: catalogueData.listData.data1,
  getCatalogue: catalogueData.getData.data1,
  postCatalogue: catalogueData.postData.data1,
  deleteCatalogue: catalogueData.deleteData.data1,

  listEnrollment: enrollmentData.listData.data1,
  getEnrollment: enrollmentData.getData.data1,
  postEnrollment: enrollmentData.postData.data1,
  deleteEnrollment: enrollmentData.deleteData.data1,

  getUser: userData.getData.data1,
  postUser: userData.postData.data1,
  putUser: userData.putData.data1,
  deleteUser: userData.deleteData.data1,
}

module.exports = mockData1
