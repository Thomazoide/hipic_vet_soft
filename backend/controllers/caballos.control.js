const Caballos = require('./../models/caballos')

const horseCtrl = {}

horseCtrl.getHorses = async (req, res) => {
    const horses = await Caballos.find()
    res.json(horses)
}

horseCtrl.setHorse = async (req, res) => {
    const newHorse = new Caballos(req.body)
    await newHorse.save()
    res.json(newHorse)
}

module.exports = horseCtrl