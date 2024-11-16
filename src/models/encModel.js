const mongoose = require('mongoose');

//Definicion del esquema
const encSchema = new mongoose.Schema({
    matricula: {
        type: String,
        required: true,
        unique: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { versionKey: false });

const Encuestador = mongoose.model('Encuestador',encSchema);

module.exports = Encuestador;