const cors = require('cors')
const express = require('express')
const app = express()


app.set('port', process.env.PORT || 4444)

app.use(express.json())


app.use(cors())

/* Seccion APIs */

app.use('/api/users', require('./../routes/usuarios.routes'))
app.use('/api/caballos', require('./../routes/caballos.routes'))
app.use('/api/fichas', require('./../routes/ficha_medica.routes'))
app.use('/api/login', require('./../routes/login.routes'))
app.use('/api/notis', require('../routes/notificaciones.routes'))

module.exports = app