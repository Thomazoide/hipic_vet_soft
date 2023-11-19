const Caballos = require('./../models/caballos')

const horseCtrl = {}

horseCtrl.getHorses = async (req, res) => {
    try{
        const horses = await Caballos.find()
        res.json(horses)
    }catch(err){
        res.status(400).json({mensaje: 'Error'})
    }
}

horseCtrl.setHorse = async (req, res) => {
    try{    
        const newHorse = new Caballos(req.body)
        await newHorse.save()
        res.status(200).json(newHorse)
    }catch(err){
        res.status(400).json({mensaje: 'Error'})
    }
    
}

horseCtrl.delHorse = async (req, res) => {
    const {_id} = req.body
    try{
        await Caballos.findByIdAndDelete({_id: _id})
        res.status(200).json({mensaje: 'Exito en la operación...'})
    }catch(err){
        res.status(400).json({mensaje: 'Error en la operación...'})
    }
}

module.exports = horseCtrl