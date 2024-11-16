const mongoose = require('mongoose');

const acceptSchema = new mongoose.Schema({
    id_investigador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Investigador',
        required: true,
    },
    id_encuestador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Encuestador',
        required: true,
    },
    validador: {
        type: Boolean,
        default: false,
    }
}, { versionKey: false });

const isAccepted = mongoose.model('isAccepted', acceptSchema);

module.exports = isAccepted;