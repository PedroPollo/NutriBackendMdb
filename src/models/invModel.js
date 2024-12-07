const mongoose = require('mongoose');

const invSchema = new mongoose.Schema({
    nom_usuario: {
        type: String,
        required: true,
    },
    apellidos_usuario: {
        type: String,
        required: true,
    },
    identificador: {
        type: String,
        required: true,
        unique: true,
    },
    correo_ins: {
        type: String,
        required: true,
        unique: true
    },
    correo_alter: {
        type: String,
        required: true,
        unique: true
    },
    contr: {
        type: String,
        required: true,
    },
    aceptado: {
        type: Boolean,
        default: false
    }
});

const Usuarios = mongoose.model('Usuarios', invSchema);
module.exports = Usuarios;