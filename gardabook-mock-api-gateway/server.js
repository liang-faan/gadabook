const express = require('express')

const routes = require('./routes')
const mockData = require('./mockData')

const app = express()

routes(app, mockData)

const port = 3000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
