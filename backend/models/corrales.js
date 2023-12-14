const {Schema, model} = require('mongoose')

const Corrales = new Schema({
    cod_corral: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    capacidad: {
        type: Schema.Types.Number,
        required: true
    },
    cant_caballos: {
        type: Schema.Types.Number,
        default: 0
    },
    equipo: {
        type: Schema.Types.String,
        default: 'open'
    }
})

module.exports = model('corrales', Corrales)