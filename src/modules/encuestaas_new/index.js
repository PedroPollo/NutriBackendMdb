const db = require('../../mdb/mongo');
const ctrl = require('./controler');
console.log(typeof ctrl); 
console.log(ctrl);  
module.exports = ctrl(db);