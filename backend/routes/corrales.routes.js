const {Router} = require('express')
const {getCorrales} = require('./../controllers/corrales.control')
const requireAuth = require('./../middlewares/requireAuth')
const router = Router()
router.use(requireAuth)
router.route('/')
    .get(getCorrales)

module.exports = router