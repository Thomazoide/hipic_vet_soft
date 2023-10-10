const {Schema, model} = require('mongoose')

const Examenes = new Schema({
    nombre: String,
    fecha: Date,
    descripcion: String,
})

const Vacunaciones = new Schema({
    nombre_vacuna: String,
    fecha: Date,
    descripcion: String,
})

const Operaciones = new Schema({
    nombre: String,
    fecha: Date,
    descripcion: String,
})

const Fmedica = new Schema({
    codigo: { /* Debe ser igual a "codigo_caballo" del modelo "caballos.js" */
        type: String,
        required: true,
    },
    peso: Schema.Types.Decimal128,
    examenes: [Object],
    vacunaciones: [Object],
    operaciones: [Object],

})

module.exports = model('fichas_medicas', Fmedica)