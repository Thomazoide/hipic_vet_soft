const cors = require('cors')
const express = require('express')
const app = express()


app.set('port', process.env.PORT || 4444)

app.use(express.json())


app.use(cors({
    origin: true
}))


/* Seccion APIs */

app.use('/api/users', require('./../routes/usuarios.routes'), cors())
app.use('/api/caballos', require('./../routes/caballos.routes'), cors())
app.use('/api/fichas', require('./../routes/ficha_medica.routes'), cors())
app.use('/api/login', require('./../routes/login.routes'),cors())
app.use('/api/notis', require('../routes/notificaciones.routes'), cors())
app.use('/api/teams', require('./../routes/equipos.routes'), cors())
app.use('/api/corrales', require('./../routes/corrales.routes'), cors())

module.exports = app