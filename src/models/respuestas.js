const mongoose = require('mongoose');

//Definicion del esquema
const respuetaSchema = new mongoose.Schema({
    id_pregunta: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'encuestas.preguntas'
    },
    respuesta: {
        type: String,
        required: true,
    }
}, {versionKey: false});

const encuestaAplicadaSchema = new mongoose.Schema({
    id_encuestador: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'encuestadors'
    },
    id_encuesta: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'encuestas'
    },
    respuestas: {
        type: [respuetaSchema],
        required: true,
    },
    fecha_aplicacion: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });

const EncuestaAplicada = mongoose.model('encuestasaplicadas', encuestaAplicadaSchema);

module.exports = EncuestaAplicada;