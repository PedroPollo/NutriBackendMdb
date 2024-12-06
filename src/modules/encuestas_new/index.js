const db = require('../../mdb/mongo');
const ctrl = require('./controler');
console.log(typeof ctrl); // ¿Qué imprime? "function" u otra cosa
console.log(ctrl);  
module.exports = ctrl(db);