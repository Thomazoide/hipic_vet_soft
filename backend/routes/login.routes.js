const {Router} = require('express')
const {login} = require('./../controllers/login.control')
const router = Router()
router.route('/')
    .post(login)
module.exports = router