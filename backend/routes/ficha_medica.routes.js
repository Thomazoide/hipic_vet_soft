const {Router} = require('express')
const {getFichas, crearFicha, updateFicha, deleteFicha} = require('./../controllers/ficha_medica.control')
const router = Router()
router.route('/')
    .get(getFichas)
    .post(crearFicha)
    .put(updateFicha)
    .delete(deleteFicha)
module.exports = router