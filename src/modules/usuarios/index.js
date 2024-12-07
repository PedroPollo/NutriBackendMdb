const db = require('../../mdb/mongo');
const ctrl = require('./controller');

module.exports = ctrl(db);