const {Router} = require('express')
const {getTeams} = require('./../controllers/equipos.control')
const requireAuth = require('./../middlewares/requireAuth')
const router = Router()
router.use(requireAuth)
router.route('/')
    .get(getTeams)

module.exports = router