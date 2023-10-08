const {Router} = require('express')
const {getFichas, crearFicha, updateFicha} = require('./../controllers/ficha_medica.control')
const router = Router()
router.route('/')
    .get(getFichas)
    .post(crearFicha)
    .put(updateFicha)
module.exports = router