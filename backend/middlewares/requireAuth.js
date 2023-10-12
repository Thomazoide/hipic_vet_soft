const jwt = require('jsonwebtoken')
const Usuarios = require('./../models/usuarios')

const requireAuth = async (req, res, next) => {
    const {authorization} = req.headers
    console.log(req.headers, req.body)
    if(!authorization){
        return res.status(401).json({error: 'Token requerido...'})
    }
    const token = authorization.split(' ')[1]
    try{
        const {_id} = jwt.verify(token, process.env['SECRET'])
        console.log(_id)
        req.user = await Usuarios.findOne({_id})
        next()
    }catch(err){
        console.log(err)
        res.status(401).json({error: 'No autorizado'})
    }
}

module.exports = requireAuth