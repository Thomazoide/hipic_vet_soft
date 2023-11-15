const Fmedica = require('./../models/ficha_medica')

const FmedicaCtrl = {}

FmedicaCtrl.getFichas = async (req, res) => {
    const fichas = await Fmedica.find()
    res.json(fichas)
}

FmedicaCtrl.crearFicha = async (req, res) => {
    const {codigo, peso, habilitado, examenes, vacunaciones, operaciones} = req.body
    const nueva_ficha = new Fmedica({
        codigo: codigo,
        peso: peso,
        habilitado: habilitado,
        examenes: examenes,
        vacunaciones: vacunaciones,
        operaciones: operaciones
    })
    await nueva_ficha.save()
    res.json(nueva_ficha)
}

FmedicaCtrl.updateFicha = async (req, res) => {
    const auxF = req.body
    try{
        console.log("Result: ", auxF)
        await Fmedica.updateOne({_id: auxF._id}, auxF)
        return res.status(200).json({message: "Agregado!"})
    }catch(err){
        console.log(err)
    }
}

FmedicaCtrl.deleteFicha = async (req ,res) => {
    const auxF = req.body
    try{
        console.log('Result: ', auxF)
        await Fmedica.findByIdAndDelete(auxF._id)
        res.status(200).json({message: "Eliminado!"})
    }catch(err){
        console.log(err)
    }
}

module.exports = FmedicaCtrl