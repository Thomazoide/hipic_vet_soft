const Caballos = require('./../models/caballos')

const horseCtrl = {}

horseCtrl.getHorses = async (req, res) => {
    const horses = await Caballos.find()
    res.json(horses)
}

horseCtrl.setHorse = async (req, res) => {
    const {nombre, peso, propietario, codigo} = req.body
    const newHorse = new Caballos({
        nombre: nombre,
        peso: peso,
        propietario: propietario,
        codigo: codigo
    })
    await newHorse.save()
    res.json(newHorse)
}

module.exports = horseCtrl