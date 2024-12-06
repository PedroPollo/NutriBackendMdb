const bcrypt = require('bcryptjs');
const auth = require('../../auth');
const querys = require('../../mdb/mongo');
const controller = require('../auth/index');
const mongoose = require('mongoose');
const moment = require('moment'); // Asegúrate de instalar moment.js

module.exports = function(dbinyectada) {
    let db = dbinyectada;

    if (!db) {
        db = require('../../mdb/mongo');
    }

    async function encuestas(body) {
        const consulta = {
            autor: { $in: body.investigadores } // Usamos $in para múltiples IDs
        };
    
        try {
            const result = await querys.query(querys.Encuestas, consulta);
            return result;
        } catch (error) {
            throw new Error(`Error al consultar encuestas: ${error.message}`);
        }
    }

    async function load(body) {
        try {
            
            if (typeof body === 'string') {
                body = JSON.parse(body);
            }
            // Desestructura el array de encuestas desde `body.data`
            const encuestas = body.data;
    
            // Procesa cada encuesta de manera asincrónica
            const respuestas = await Promise.all(
                encuestas.map(async (encuesta) => {
                    // Verifica y convierte `fecha_aplicacion` si está en formato DD-MM-YYYY
                    if (typeof encuesta.fecha_aplicacion === 'string') {
                        encuesta.fecha_aplicacion = moment(encuesta.fecha_aplicacion, "DD-MM-YYYY").toDate();
                    }
    
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