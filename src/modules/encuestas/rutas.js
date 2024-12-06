const express = require('express');

const responses = require('../../net/responses');
const controller = require('./index');

const router = express.Router();

router.post('/', encuestas);
router.post('/loadresp', load);

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

module.exports = router;