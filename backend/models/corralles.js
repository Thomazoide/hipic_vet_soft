const {Schema, model} = require('mongoose')

const Corrales = new Schema({
    cod_corral: {
        type: String,
        required: true,
        unique: true,
    },
    capacidad_caballos: {
        type: Number,
        required: true,
    },
})

module.exports = model('corrales', Corrales)