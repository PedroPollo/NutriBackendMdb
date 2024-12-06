const mongoose = require('mongoose');

//Definicion del esquema
const preguntaSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        enum: ['abierta', 'opcion-multiple'],
        required: true
    },
    opciones: {
        type: [String],
        default: []
    },
});

const encuestaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    preguntas: {
        type: [preguntaSchema], // Un array de objetos pregunta
        required: true
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Encuesta', encuestaSchema);
