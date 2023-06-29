const {Router} = require('express')
const {getHorses, setHorse} = require('./../controllers/caballos.control')
const router = Router()
router.route('/')
    .get(getHorses)
    .post(setHorse)

module.exports = router