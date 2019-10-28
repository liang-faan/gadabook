const express = require('express')

const routes = require('./routes')
const mockData = require('./mockData')

const app = express()

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001') // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

routes(app, mockData)

const port = 3000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
