const cors = require('cors')
const express = require('express')
const app = express()


app.set('port', process.env.PORT || 4444)

app.use(express.json())


app.use(cors({
    origin: ['http://34.230.2.165:5173', 'http://localhost:4444', 'https://tsi97wk2d8.execute-api.us-east-1.amazonaws.com', 'https://hipic-vet-soft.vercel.app/']
}))


/* Seccion APIs */

app.use('/api/users', require('./../routes/usuarios.routes'), cors())
app.use('/api/caballos', require('./../routes/caballos.routes'))
app.use('/api/fichas', require('./../routes/ficha_medica.routes'))
app.use('/api/login', require('./../routes/login.routes'))
app.use('/api/notis', require('../routes/notificaciones.routes'))
app.use('/api/teams', require('./../routes/equipos.routes'))
app.use('/api/corrales', require('./../routes/corrales.routes'))

module.exports = app