const bookingRoutes = require('./booking')
const catalogueRoutes = require('./catalogue')
const enrollmentRoutes = require('./enrollment')
const userRoutes = require('./user')

module.exports = (app, mockData) => {
  bookingRoutes(app, mockData)
  catalogueRoutes(app, mockData)
  enrollmentRoutes(app)
  userRoutes(app)
}
