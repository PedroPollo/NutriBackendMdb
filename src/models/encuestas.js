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
}, { versionKey: false });

const EncuestasSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: {
        type: String,
        required: true
    },
    preguntas: {
        type: [preguntaSchema], // Un array de objetos pregunta
        required: true
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'investigadors',
        required: true
    },
    fechaCreacion: {
        type: Date,
        required:true
    }
});

const Encuestador = mongoose.model('encuestas', EncuestasSchema)

module.exports = Encuestador;