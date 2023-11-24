const Corrales = require('./../models/corrales')

const crrCtrl = {}

crrCtrl.getCorrales = async (req, res) => {
    try{
        const stables = await Corrales.find()
        res.status(200).json(stables)
    }catch(err){
        res.status(400).json({mensaje: 'Error al obtener datos...'})
    }
}

module.exports = crrCtrl