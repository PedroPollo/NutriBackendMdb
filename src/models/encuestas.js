const mongoose = require('mongoose');

const EncuestasSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    preguntas: [
        {
            tipo: String,
            texto: String,
            opciones: [String],
        }
    ],
    fechaCreacion: {
        type: Date,
        default: Date.now,
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId, // Relación con el modelo Usuario
        ref: 'Usuario',
        required: true,
    },
});


const Encuestador = mongoose.model('encuestas', EncuestasSchema)

module.exports = Encuestador;