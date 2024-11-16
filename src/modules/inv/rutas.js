const express = require('express');

const responses = require('../../net/responses');
const controller = require('./index');

const router = express.Router();

router.get('/', all);
router.post('/add', add);

async function all(req, res, next) {
    try {
        const all = await controller.all();  // Llamada al controlador que ahora retorna una promesa
        responses.success(req, res, all, 200);  // Respuesta exitosa
    } catch (error) {
        next(error);  // Si hay un error, pasa al siguiente middleware
    }
}

async function add(req, res, next) {
    try {
        const all = await controller.add(req.body);
        if(req.body.id == 0) {
            message = 'Item succesfully aded';
        } else {
            message = 'Item succesfully updated';
        }
        responses.success(req, res, message, 201);
    } catch (error) {
        next(error); // Si hay un error, pasa al
    }
}

module.exports = router;