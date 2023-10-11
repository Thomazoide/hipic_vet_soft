const Usuarios = require('./../models/usuarios')

const userCtrl = {}

userCtrl.getUsers = async (req, res) => {
    const users = await Usuarios.find()
    res.json(users)
}

userCtrl.setUser = async (req, res) => {
    
    try{
        const {tipo, nombre, rut, email, cell, pass, corrales_en_posesion} = req.body
        if(rut.length < 9){
            throw Error('Rut invalido')
        }
        console.log(rut)
        let cod_equipo = ''
        let auxRut = rut.split('-')[0]
        auxRut = auxRut.substr((auxRut.length-3), auxRut.length)
        let auxLn = nombre.split(' ')[1]
        auxLn = auxLn.substr(0, 4)
        auxLn = auxLn.toLowerCase()
        cod_equipo = `${auxRut}${auxLn}`
        console.log(cod_equipo)
        const newUser = await Usuarios.signup(tipo, nombre, rut, email, cell, pass, cod_equipo, corrales_en_posesion)
        console.log('Object::: ', corrales_en_posesion)
        
        res.status(200).json({rut, newUser})
    }catch(err){
        res.status(400).json(err.message)
        console.log(err.message)
    }
}

module.exports = userCtrl