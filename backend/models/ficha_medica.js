const {Schema, model} = require('mongoose')

const Examenes = new Schema({})

const Vacunaciones = new Schema({})

const Operaciones = new Schema({})

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