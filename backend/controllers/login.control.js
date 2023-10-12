const Usuarios = require('./../models/usuarios')
const jwt = require('jsonwebtoken')

const crearToken = (_id, tipo, nombre, cod_equipo) => {
    return jwt.sign({_id, tipo, nombre, cod_equipo}, process.env['SECRET'], {expiresIn: '1h'})
}

const loginCtrl = {}

loginCtrl.login = async (req, res) => {
    const {rut, pass} = req.body
    try{
        const user = await Usuarios.login(rut, pass)
        const token = crearToken(user._id, user.tipo, user.nombre, user.cod_equipo)
        res.status(200).json({token: token})
    }catch(err){
        res.status(400).json({message: 'Bad login...', detail: err.message})
    }
}

module.exports = loginCtrl