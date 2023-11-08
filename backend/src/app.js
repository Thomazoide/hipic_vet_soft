const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()



/*const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)*/

app.set('port', process.env.PORT || 4444)

app.use(express.json())
app.use(bodyParser.json({limit: '100mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}))

app.use(cors())

/* Seccion APIs */

app.use('/api/users', require('./../routes/usuarios.routes'))
app.use('/api/caballos', require('./../routes/caballos.routes'))
app.use('/api/fichas', require('./../routes/ficha_medica.routes'))
app.use('/api/login', require('./../routes/login.routes'))
app.use('/api/notis', require('../routes/notificaciones.routes'))

/* Seccion manejo de archivo */

app.use('/upload', require('./../routes/files.routes'))


module.exports = app