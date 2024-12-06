const mongoose = require('mongoose');

const encuestaSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('Encuesta', encuestaSchema);
