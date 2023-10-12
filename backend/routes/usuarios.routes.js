const {Router} = require('express')
const {getUsers, setUser} = require('./../controllers/usuarios.control')
const requireAuth = require('./../middlewares/requireAuth')
const router = Router()
router.use(requireAuth)
router.route('/')
    .get(getUsers)
    .post(setUser)

module.exports = router