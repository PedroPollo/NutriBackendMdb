const mongoose = require('mongoose');

const acceptSchema = new mongoose.Schema({
    id_investigador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    id_encuestador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'encuestadors',
        required: true,
    },
    validador: {
        type: Boolean,
        default: false,
    }
}, { versionKey: false });

const isAccepted = mongoose.model('isaccepteds', acceptSchema);

module.exports = isAccepted;