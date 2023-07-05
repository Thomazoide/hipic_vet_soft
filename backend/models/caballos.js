const {Schema, model} = require('mongoose')

const Caballos = new Schema({
    nombre: String,
    propietario: String,
    codigo_caballo: {
        type: String,
        required: true,
    },
    codigo_equipo:{
        type: String,
        required: true,
    },
    codigo_corral:{
        type: String,
        required: true,
    }
})

module.exports = model('caballos', Caballos)