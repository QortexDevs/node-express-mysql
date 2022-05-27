const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const port = 3000

// defining the Express app
const app = express()
// defining an array to work as the database (temporary solution)
const ads = [{ title: 'Hello, world (again)!' }]

// adding Helmet to enhance your Rest API's security
app.use(helmet())

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json())

// enabling CORS for all requests
app.use(cors())

// adding morgan to log HTTP requests
app.use(morgan('combined'))

// defining an endpoint to return all ads
app.get('/', (req, res) => {
  res.send(ads)
})

const db = require('./models')
db.sequelize.sync()

require('./routes/stub.routes')(app)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
