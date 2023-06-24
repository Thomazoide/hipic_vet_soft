const Fmedica = require('./../models/ficha_medica')

const FmedicaCtrl = {}

FmedicaCtrl.getFichas = async (req, res) => {
    const fichas = await Fmedica.find()
    res.json(fichas)
}

FmedicaCtrl.crearFicha = async (req, res) => {
    const {codigo, examenes, vacunaciones, operaciones} = req.body
    const nueva_ficha = new Fmedica({
        codigo: codigo,
        examenes: examenes,
        vacunaciones: vacunaciones,
        operaciones: operaciones
    })
    await nueva_ficha.save()
    res.json(nueva_ficha)
}

module.exports = FmedicaCtrl