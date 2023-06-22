const cors = require('cors')
const express = require('express')
const app = require('../../../hipic/backend/src/app')
const app = express()
app.set('port', process.env.PORT || 4444)
app.use(cors())
app.use(express.json())



module.exports = app