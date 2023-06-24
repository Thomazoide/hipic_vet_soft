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
    codigo: {
        type: String,
        required: true,
    },
    examenes: [Examenes],
    vacunaciones: [Vacunaciones],
    operaciones: [Operaciones],

})

module.exports = model('fichas_medicas', Fmedica)