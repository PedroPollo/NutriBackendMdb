const db = require('../../mdb/mongo');
const ctrl = require('./controler');

module.exports = ctrl(db);