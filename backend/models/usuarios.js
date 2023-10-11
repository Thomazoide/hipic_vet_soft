const {Schema, model} = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
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

Usuarios.statics.signup = async function(tipo, nombre, rut, email, cell, pass, cod_equipo, corrales_en_posesion){
    if(!tipo || !rut || !pass || !cod_equipo){
        throw Error('Flatan valores por entregar...')
    }
    if(email){
        if(!validator.isEmail(email)){
            throw Error('Email invalido...')
        }
    }
    const exists = await this.findOne({rut})
    if(exists){
        throw Error('usuario ya existe')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(pass, salt)
    const user = await this.create({tipo, nombre, rut, email, cell, pass: hash, cod_equipo, corrales_en_posesion})
    return user
}

Usuarios.statics.login = async function(rut, pass){
    if(!rut || !pass){
        throw Error('Debe rellenar los campos...')
    }
    const user = await this.findOne({rut: rut})
    if(!user){
        throw Error('Rut incorrecto...')
    }
    const match = await bcrypt.compare(pass, user.pass)
    if(!match){
        throw Error('Contrasena incorrecta...')
    }
    return user
}

module.exports = model("usuarios", Usuarios)