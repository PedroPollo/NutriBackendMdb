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
            autor: { $in: body.investigadores }// Usamos $in para múltiples IDs
        };
    
        try {
            const result = await querys.query2(querys.Encuestas, consulta);
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
                        encuesta.fecha_aplicacion = moment(encuesta.fecha_aplicacion, "DD-MM-YYYY HH:mm:ss").toDate();
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

    async function crear(body) {
        try {
            const fechaActual = new Date();

            // Convertir a ISO con ajuste de zona horaria
            const fechaISO = new Date(fechaActual.getTime() - fechaActual.getTimezoneOffset() * 60000).toISOString();

            // Reemplazar el formato para incluir la zona horaria
            body.fechaCreacion = `${fechaISO.slice(0, -1)}+00:00`;
            return await querys.add(querys.Encuestas, body);
        } catch (error) {
            throw error;
        }
    }

    async function obtenerEncuestas(body) {
        try {
            consulta = {
                autor: body.usuario
            }
            return await querys.query2(querys.Encuestas, consulta);
        } catch (error) {
            throw error;
        }
    }

    async function obtenerEncuesta(req) {
        try{
            consulta = {
                _id: req.params.id
            }
            return await querys.queryOne(querys.Encuestas, consulta);
        } catch (error) {
            throw error;
        }
    }

    async function eliminar(req) {
        try {
            const del = await querys.del(querys.Encuestas, req.params.id);
            return del
        } catch (error) {
            throw error;
        }
    }

    async function actualizar(req) {
        try {
            const up = await querys.actualizar(querys.Encuestas, req.params.id, req.body);
            return up === null ? 'No se pudo actualizar la encuesta' : 'La encuesta se actualizo correctamente';
        } catch (error) {
            throw error;
        }
    }

    async function respuestas(req) {
        try {
            consulta = {
                id_encuesta: req.params.id
            }
            console.log(consulta)
            const respuestas = await querys.query2(querys.EncuestasAp, consulta);
            return respuestas
        } catch (error) {
            throw error;
        }
    }

    return{
        encuestas,
        load,
        crear,
        obtenerEncuestas,
        obtenerEncuesta,
        eliminar,
        actualizar,
        respuestas,
    }
}