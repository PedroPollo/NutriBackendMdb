const bcrypt = require('bcryptjs');
const auth = require('../../auth');
const querys = require('../../mdb/mongo');
const controller = require('../auth/index');
const mongoose = require('mongoose');

module.exports = function(dbinyectada) {
    let db = dbinyectada;

    if (!db) {
        db = require('../../mdb/mongo');
    }

    async function encuestas(body) {
        const consulta = {
            autor: body.id_investigador
        }

        return await querys.query(querys.Encuestas, consulta)
    }

    async function load(body) {
        try {
            // Desestructura el array de encuestas desde `body.data`
            const encuestas = body.data;
    
            // Procesa cada encuesta de manera asincrónica
            const respuestas = await Promise.all(
                encuestas.map(async (encuesta) => {
                    // Inserta cada encuesta en la base de datos
                    return await querys.add(querys.EncuestasAp, encuesta);
                })
            );
    
            // Devuelve las respuestas de las encuestas insertadas
            return respuestas;
        } catch (error) {
            throw error; // Lanza el error si ocurre alguno
        }
    }
    

    return{
        encuestas,
        load,
    }
}