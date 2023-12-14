const Usuarios = require('./../models/usuarios')
const Corrales = require('./../models/corrales')
const Equipos = require('./../models/equipos')

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
        if(tipo === 'preparador'){
            const team = await Equipos.findOne({codigo: cod_equipo})
            team.prep = rut
            await Equipos.updateOne({_id: team._id}, team)
            const crls = await Corrales.find()
            let modData = []
            corrales_en_posesion.forEach( sc => {
                modData.push(crls.filter( c => c.cod_corral === sc )[0])
            } )
            const newcrrs= modData.map(c => c.cod_corral )
            await Corrales.updateMany( {cod_corral: {$in: newcrrs}}, {equipo: cod_equipo} )
        }
        res.status(200).json({rut, newUser})
    }catch(err){
        console.log(err)
        res.status(400).json(err.message)
    }
}

userCtrl.delUser = async (req, res) => {
    try{
        const body = req.body
        if(body.tipo === 'team'){
            const usrsIDS = []
            body.vets.forEach( v => {
                usrsIDS.push(v._id)
            } )
            console.log(usrsIDS)
            const crls = []
            body.corrales.forEach( c => {
                crls.push(c.cod_corral)
            } )
            await Usuarios.findByIdAndDelete({_id: body.prep[0]._id})
            await Equipos.updateOne({codigo: body.codigo}, {prep: 'open'})
            await Usuarios.updateMany( {_id: {$in: usrsIDS}}, {cod_equipo: 'open'} )
            await Corrales.updateMany( {cod_corral: {$in: crls}}, {equipo: 'open'} )
            res.status(200).json({message: 'Exito en la operacion...'})
            return
        }else{
            await Usuarios.findByIdAndDelete({_id: body._id})
            res.status(200).json({message: 'Exito en la operacion...'})
            return
        }
    }catch(err){
        res.status(400).json({message: 'Error al eliminar...', error: err.message})
    }
}

userCtrl.getUser = async (req, res) => {
    try{
        const {_id} = req.body
        const payload = await Usuarios.findById({_id})
        res.status(200).json(payload)
    }catch(err){
        res.status(404).json({mensaje: 'USUARIO NO ENCONTRADO...'})
    }
}

userCtrl.patchUser = async (req, res) => {
    try{
        const {nt, rut} = req.body
        const usr = await Usuarios.findOne({rut: rut})
        usr.cod_equipo = nt
        await Usuarios.updateOne({_id: usr._id}, usr)
        res.status(200).json({message: 'Exito en la operacion...'})
    }catch(err){
        res.status(400).json({message: 'Error en la operacion...'})
    }
}

module.exports = userCtrl