const {Schema, model} = require('mongoose')

const Caballos = new Schema({
    nombre: String,
    peso: Schema.Types.Decimal128,
    propietario: String,
    codigo: {
        type: String,
        required: true,
    },
})

module.exports = model('caballos', Caballos)