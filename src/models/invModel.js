const mongoose = require('mongoose');

const invSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
}, { versionKey: false });

const Investigador = mongoose.model('investigadors', invSchema);
module.exports = Investigador;