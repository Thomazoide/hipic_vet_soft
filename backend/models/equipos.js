const {Schema, model} = require('mongoose')

const Equipos = new Schema({
    codigo: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    prep: {
        type: Schema.Types.String,
        default: 'open'
    }
})

module.exports = model('equipos', Equipos)