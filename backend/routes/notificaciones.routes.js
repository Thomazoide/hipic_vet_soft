const {Router} = require('express')
const {getNotis, delNoti, crearNoti} = require('../controllers/notificaciones.control')
const requireAuth = require('../middlewares/requireAuth')
const router = Router()
router.use(requireAuth)
router.route('/')
    .get(getNotis)
    .post(crearNoti)
    .delete(delNoti)

module.exports = router