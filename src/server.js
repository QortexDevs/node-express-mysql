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
// production
//db.sequelize.sync()

// development
const Role = db.role
db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Db')
  initial()
})

function initial () {
  Role.create({
    id: 1,
    name: 'user'
  })

  Role.create({
    id: 2,
    name: 'moderator'
  })

  Role.create({
    id: 3,
    name: 'admin'
  })
}

require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)
require('./routes/stub.routes')(app)
app.listen(port, () => {
  console.log('')
  console.log('')
  console.info(`Example app listening on http://wagner.stage.qortex.ru:3031/`)
  console.info(`Adminer is listening on http://wagner.stage.qortex.ru:8031/`)
  console.log('')
  console.log('')
})
