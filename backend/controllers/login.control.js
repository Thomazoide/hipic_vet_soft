const Usuarios = require('./../models/usuarios')
const jwt = require('jsonwebtoken')

const crearToken = (_id) => {
    return jwt.sign({_id: _id}, process.env['SECRET'], {expiresIn: '1h'})
}

const loginCtrl = {}

loginCtrl.login = async (req, res) => {
    const {rut, pass} = req.body
    try{
        const user = await Usuarios.login(rut, pass)
        const token = crearToken(user._id)
        res.status(200).json({user: user, token: token})
    }catch(err){
        res.status(400).json({message: 'Bad login...', detail: err.message})
    }
}

module.exports = loginCtrl