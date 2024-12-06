const mongoose = require('mongoose');

// Definición del esquema de usuario
const usuarioSchema = new mongoose.Schema({
    nom_usuario: String,
    apellidos_usuario: String,
    identificador: String,
    correo_ins: String,
    correo_alter: String,
    contr: String,
    aceptado: { type: Boolean, default: false } 
});

// Exportar el modelo
module.exports = mongoose.model('Usuario', usuarioSchema);
