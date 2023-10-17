const {Router} = require('express')
const {login, verToken} = require('./../controllers/login.control')
const router = Router()
router.route('/')
    .put(verToken)
    .post(login)
module.exports = router