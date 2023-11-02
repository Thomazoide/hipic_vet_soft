const {Router} = require('express')
const {getUsers, setUser, delUser, getUser} = require('./../controllers/usuarios.control')
const requireAuth = require('./../middlewares/requireAuth')
const router = Router()
router.use(requireAuth)
router.route('/')
    .get(getUsers)
    .post(setUser)
    .delete(delUser)
    .put(getUser)

module.exports = router