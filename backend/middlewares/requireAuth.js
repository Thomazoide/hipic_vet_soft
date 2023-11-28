const jwt = require('jsonwebtoken')
const Usuarios = require('./../models/usuarios')

const requireAuth = async (req, res, next) => {
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error: 'Token requerido...'})
    }
    const token = authorization.split(' ')[1]
    try{
        const {_id} = jwt.verify(token, process.env['SECRET'])
        req.user = await Usuarios.findOne({_id})
        next()
    }catch(err){
        res.status(401).json({mensaje: 'TIMEDOUT'})
    }
}

module.exports = requireAuth