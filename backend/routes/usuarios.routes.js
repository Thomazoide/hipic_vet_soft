const {Router} = require('express')
const {getUsers, setUser} = require('./../controllers/usuarios.control')
const router = Router()
router.route('/')
    .get(getUsers)
    .post(setUser)

module.exports = router