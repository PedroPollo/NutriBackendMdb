const querys = require('../../mdb/mongo');

module.exports = function(dbinyectada) {
    
    let db = dbinyectada

    if (!db) {
        db = require('../../mdb/mongo');
    }

    async function all() {
        try {
            // Reemplaza cualquier callback con await para la consulta
            const results = await querys.Investigador.find({ aceptado: true }, { _id: 1, nom_usuario: 1, apellidos_usuario: 1 }); // Ahora devuelve una promesa y se espera el resultado
            if (!results || results.length === 0) {
                throw new Error('No records found');
            }
            return results;
        } catch (error) {
            throw error;  // Lanza el error para ser manejado en el middleware de manejo de errores
        }
    }

    async function add(body) {
        try {
            const index = {
                name: body.name
            }
            console.log(index);
            const respuesta = await querys.add(querys.Investigador, index);
        } catch (error) {
            throw new Error(error);
        }
    }

    return {
        all,
        add,
    }

}