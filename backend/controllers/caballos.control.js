const Caballos = require('./../models/caballos')
const Corrales = require('./../models/corrales')

const horseCtrl = {}

horseCtrl.getHorses = async (req, res) => {
    try{
        const horses = await Caballos.find()
        res.json(horses)
    }catch(err){
        res.status(400).json({mensaje: 'Error'})
    }
}

horseCtrl.setHorse = async (req, res) => {
    try{
        const {nombre, propietario, codigo_equipo, codigo_corral} = req.body
        const codigo_caballo = `${nombre.slice(0, 3)}${propietario.slice(-3)}`
        const crls = await Corrales.findOne({cod_corral: codigo_corral})
        crls.cant_caballos += 1
        console.log(crls)
        await Corrales.updateOne({cod_corral: codigo_corral}, crls)
        const newHorse = new Caballos({
            nombre: nombre,
            propietario: propietario,
            codigo_caballo: codigo_caballo,
            codigo_equipo: codigo_equipo,
            codigo_corral: codigo_corral
        })
        await newHorse.save()
        res.status(200).json(newHorse)
    }catch(err){
        res.status(400).json({mensaje: 'Error'})
    }
    
}

horseCtrl.updateHorse = async (req, res) => {
    try{
        const oldHorse = req.body
        if(oldHorse.newPptr){
            const newHorse = oldHorse
            newHorse.propietario = oldHorse.newPptr
            delete newHorse.newPptr
            await Caballos.updateOne({_id: newHorse._id}, newHorse)
            res.status(200).json(newHorse)
            return
        }else if( oldHorse.newCr ){
            const newHorse = oldHorse
            const newCorral = await Corrales.findOne({cod_corral: newHorse.newCr})
            const oldCorral = await Corrales.findOne({cod_corral: newHorse.codigo_corral})
            newHorse.codigo_corral = oldHorse.newCr
            delete newHorse.newCr
            oldCorral.cant_caballos -= 1
            newCorral.cant_caballos += 1
            await Corrales.updateOne({cod_corral: oldCorral.cod_corral}, oldCorral)
            await Corrales.updateOne({cod_corral: newCorral.cod_corral}, newCorral)
            await Caballos.updateOne({_id: newHorse._id}, newHorse)
            res.status(200).json(newHorse)
            return
        }else{
            throw new Error('Valores requeridos...')
        }
    }catch(err){
        res.status(400).json({mensaje: 'Error'})
    }
}

horseCtrl.delHorse = async (req, res) => {
    try{
        const {_id, codigo_corral} = req.body
        const crr = await Corrales.findOne({cod_corral: codigo_corral})
        crr.cant_caballos -= 1
        await Corrales.updateOne({cod_corral: codigo_corral}, crr)
        await Caballos.findByIdAndDelete({_id: _id})
        res.status(200).json({mensaje: 'Exito en la operación...'})
    }catch(err){
        res.status(400).json({mensaje: 'Error en la operación...'})
    }
}

module.exports = horseCtrl