const cors = require('cors')
const express = require('express')
const app = require('../../../hipic/backend/src/app')
const helmet = require('helmet')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
app.set('port', process.env.PORT || 4444)
app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))
app.use(bodyParser.json({limit: '100mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}))
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}))



module.exports = app