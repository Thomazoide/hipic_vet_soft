const Usuarios = require('./../models/usuarios')

const userCtrl = {}

userCtrl.getUsers = async (req, res) => {
    const users = await Usuarios.find()
    res.json(users)
}

userCtrl.setUser = async (req, res) => {
    
    try{
        const {tipo, nombre, rut, email, cell, pass, cod_equipo, corrales_en_posesion} = req.body
        if(rut.length < 9){
            throw Error('Rut invalido')
        }
        console.log(rut)
        console.log(cod_equipo)
        const newUser = await Usuarios.signup(tipo, nombre, rut, email, cell, pass, cod_equipo, corrales_en_posesion)
        console.log('Object::: ', corrales_en_posesion)
        
        res.status(200).json({rut, newUser})
    }catch(err){
        res.status(400).json(err.message)
        console.log(err.message)
    }
}

userCtrl.delUser = async (req, res) => {
    try{
        const {_id} = req.body
        await Usuarios.findByIdAndDelete({_id})
        res.status(200).json({message: 'Eliminado con exito...'})
    }catch(err){
        res.status(400).json({message: 'Error al eliminar...', error: err.message})
    }
}

module.exports = userCtrl