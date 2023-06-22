const {Schema, model} = require('mongoose')
const Usuarios = new Schema({
    tipo: {
        type: String,
        required: true,
    },
    nombre: String,
    rut: {
        type: String,
        required: true,
        unique: true,
    },
    email: String,
    cell: String,
    pass: {
        type: String,
        required: true,
    },
    cod_equipo: {
        type: String,
        required: true,
    },
    corrales_en_posesion: [String],
})

module.exports = model("usuarios", Usuarios)