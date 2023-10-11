const cors = require('cors')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const multer = require('multer')
const bodyParser = require('body-parser')
const path = require('path')
const { fileURLToPath } = require('url')
const app = express()

/*const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)*/

app.set('port', process.env.PORT || 4444)

app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}))
app.use(morgan('common'))
app.use(bodyParser.json({limit: '100mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}))

app.use(cors())

/* Seccion APIs */

app.use('/api/users', require('./../routes/usuarios.routes'))
app.use('/api/caballos', require('./../routes/caballos.routes'))
app.use('/api/fichas', require('./../routes/ficha_medica.routes'))
app.use('/api/login', require('./../routes/login.routes'))

/*app.use('/assets', express.static(path.join(__dirname, 'public/assets')))*/

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'public/assets')
    },
    filename: function (req, file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({storage})


module.exports = app