const multer = require('multer')
const {gfs} = require('../src/database')

const storage = multer.memoryStorage()
const upload = multer({storage: storage})

const FileCtrl = {}

FileCtrl.upFile = async (req, res) => {
    const {file} = req
    const writestream = gfs.createWriteStream({
        filename: file.originalname
    })
    writestream.write(file.buffer)
    writestream.end()
    writestream.on('close', (file) => {
        return res.status(200).json({fileId: file._id})
    })
}

module.exports = {FileCtrl, upload}