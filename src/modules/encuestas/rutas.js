const express = require('express');

const responses = require('../../net/responses');
const controller = require('./index');

const router = express.Router();

router.post('/', encuestas);
router.post('/loadresp', load);
router.get('/resultados/:id', respuestas);
router.post('/crear', crear);
router.get('/obtener-encuestas', obtenerEncuestas);
router.get('/obtenerEncuesta/:id',obtenerEncuesta);
router.put('/actualizarEncuesta/:id',actualizarEncuesta);
router.delete('/eliminarEncuesta/:id',eliminarEncuesta)

async function respuestas(req, res, next) {
    try {
        const result = await controller.respuestas(req)
        responses.success(req, res, result, 200);
    } catch (error) {
        next(error);
    }
}

async function obtenerEncuestas(req, res, next) {
    try {
        const result = await controller.obtenerEncuestas(req.body);
        responses.success(req, res, result, 200);
    } catch (error) {
        next(error);
    }
}

async function obtenerEncuesta(req, res, next) {
    try {
        const encuesta = await controller.obtenerEncuesta(req)
        responses.success(req, res, encuesta, 200);
    } catch (error) {
        next(error);
    }
}

async function eliminarEncuesta(req, res, next) {
    try {
        const message = await controller.eliminar(req);
        if (message === 500){
            responses.error(req, res, 'Error al eliminar la encuesta', 500);
        } else {
            responses.success(req, res, 'La encuesta se elimino correctamente', 200);
        }
    } catch (error) {
        next(error);
    }
}

async function actualizarEncuesta(req, res, next) {
    try {
        const result = await controller.actualizar(req)
        responses.success(req, res, result, 200);
    } catch (error) {
        next(error);
    }
}

async function encuestas(req, res, next) {
    try {
        const encuestas = await controller.encuestas(req.body);
        responses.success(req, res, encuestas, 200);
    } catch (e) {
        next(e);
    }
}

async function load(req, res, next) {
    try {
        const all = await controller.load(req.body);
        responses.success(req, res, "Datos cargados correctamente", 200);
    } catch (error) {
        next(error);
    }
}

async function crear(req, res, next) {
    try {
        const response = await controller.crear(req.body);
        responses.success(req,res, response, 200);
    } catch (error) {
        next(error);
    }
}

module.exports = router;