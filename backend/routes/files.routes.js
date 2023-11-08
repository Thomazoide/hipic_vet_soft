const {Router} = require('express')
const {FileCtrl, upload} = require('../controllers/files.control')
const requireAuth = require('../middlewares/requireAuth')
const router = Router()
router.use(requireAuth)
router.route('/')
    .post(upload.single(), FileCtrl.upFile)
module.exports = router
