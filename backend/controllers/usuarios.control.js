const Usuarios = require('./../models/usuarios')

const userCtrl = {}

userCtrl.getUsers = async (req, res) => {
    const users = await Usuarios.find()
    res.json(users)
}

userCtrl.setUser = async (req, res) => {
    const {tipo, nombre, rut, email, cell, pass, cod_equipo, corrales_en_posesion} = req.body
    const newUser = new Usuarios({
        tipo: tipo,
        rut: rut,
        pass: pass,
        cod_equipo: cod_equipo,
        corrales_en_posesion: corrales_en_posesion
    })
    await newUser.save()
    res.json(newUser)
}

module.exports = userCtrl