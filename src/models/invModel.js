const mongoose = require('mongoose');

const invSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
}, { versionKey: false });

const Investigador = mongoose.model('Investigador', invSchema);
module.exports = Investigador;