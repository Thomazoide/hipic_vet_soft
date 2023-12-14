const Equipos = require('./../models/equipos')

const eqCtrl = {}

eqCtrl.getTeams = async (req, res) => {
    try{
        const teams = await Equipos.find()
        res.status(200).json(teams)
    }catch(err){
        res.status(400).json({mensaje: 'Error al obtener datos'})
    }
}



module.exports = eqCtrl