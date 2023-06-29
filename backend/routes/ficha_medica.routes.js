const {Router} = require('express')
const {getFichas, crearFicha} = require('./../controllers/ficha_medica.control')
const router = Router()
router.route('/')
    .get(getFichas)
    .post(crearFicha)

module.exports = router