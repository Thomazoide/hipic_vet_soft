const {Router} = require('express')
const {getHorses, setHorse, delHorse} = require('./../controllers/caballos.control')
const requireAuth = require('./../middlewares/requireAuth')
const router = Router()
router.use(requireAuth)
router.route('/')
    .get(getHorses)
    .post(setHorse)
    .delete(delHorse)

module.exports = router