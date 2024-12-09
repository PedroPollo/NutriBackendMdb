const express = require('express');

const responses = require('../../net/responses');
const controller = require('./index');

const router = express.Router();

router.get('/', all);

async function all(req, res, next) {
    try {
        const all = await controller.all();  // Llamada al controlador que ahora retorna una promesa
        responses.success(req, res, all, 200);  // Respuesta exitosa
    } catch (error) {
        next(error);  // Si hay un error, pasa al siguiente middleware
    }
}

module.exports = router;