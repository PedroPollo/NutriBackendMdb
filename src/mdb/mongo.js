const mongoose = require('mongoose');
const config = require('../config');

const dbstring = config.mongo.db;

let isConnectedBefore = false; // Variable para rastrear si ya se ha conectado antes

function connectToMongoDB() {
    mongoose.connect(dbstring, {})
    .then(() => {
        isConnectedBefore = true;
        console.log('DB connected');
    })
    .catch((err) => {
        console.log('[db error]', err);
        if (!isConnectedBefore) {
            setTimeout(connectToMongoDB, 200); // Intentar reconectar después de 200 ms
        }
    });
}

// Manejar los errores de la conexión
mongoose.connection.on('error', (err) => {
    console.log('[db error]', err);
    if (err.message && err.message.match(/failed to connect to server .* on first connect/)) {
        console.log('Reconnecting to MongoDB...');
        setTimeout(connectToMongoDB, 200); // Intentar reconectar después de 200 ms
    }
});


mongoose.connection.on('disconnected', () => {
    console.log('DB disconnected. Reconnecting...');
    connectToMongoDB(); // Intentar reconectar
});

// Conectar a la base de datos por primera vez
connectToMongoDB();

//Importamos modelos
const Investigador = require('../models/invModel');
const Encuestador = require('../models/encModel');
const Validador = require('../models/acceptedModel');
const Encuestas = require('../models/encuestas');
const EncuestasAp = require('../models/respuestas');

//Funciones CRUD
async function all(Modelo) {
    try {
        const result = await Modelo.find({}); // Usando `await` para manejar la Promesa
        return result; // Devuelve los resultados si no hay errores
    } catch (error) {
        throw error; // Lanza el error para que sea manejado por el llamador
    }
}

async function one(Modelo, id) {
    try {
        const result = await Modelo.findById(id);
        return result;
    } catch (error) {
        throw error;
    }
}

async function add(Modelo, data) {
    try {
        // Crear un nuevo documento con los datos proporcionados
        const nuevoDocumento = new Modelo(data);
        
        // Guardar el documento y esperar a que se complete
        const result = await nuevoDocumento.save();
        
        // Retornar el resultado
        return result;
    } catch (error) {
        // Capturar cualquier error y lanzarlo para ser manejado en el controlador
        throw error;
    }
}

function del(Modelo, id) {
    return new Promise((resolve, reject) => {
        Modelo.findByIdAndRemove(id, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

// Cambiar la función query para usar async/await en lugar de callbacks
async function queryOne(Modelo, consulta) {
    try {
        const result = await Modelo.findOne(consulta);  // Usar await para esperar la promesa
        return result;
    } catch (error) {
        throw error;  // Lanza el error para ser manejado en el controlador
    }
}

async function query(Modelo, consulta) {
    try {
        const result = await Modelo.find(consulta);  // Usar await para esperar la promesa
        return result;
    } catch (error) {
        throw error;  // Lanza el error para ser manejado en el controlador
    }
}

module.exports = {
    mongoose,
    all,
    one,
    add,
    del,
    query,
    queryOne,
    Encuestador,
    Investigador,
    Validador,
    Encuestas,
    EncuestasAp,
};