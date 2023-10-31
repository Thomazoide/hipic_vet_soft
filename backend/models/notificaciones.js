const { Schema, model } = require('mongoose')

const Notificacion = new Schema({
    titulo: {
        type: String,
        required: true
    },
    fecha: Date,
    descripcion: String,
    target: String
})

module.exports = model('notificaciones', Notificacion)