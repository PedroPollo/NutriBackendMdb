const express = require('express');

const responses = require('../../net/responses');
const controller = require('./index');

const router = express.Router();

router.get('/', all);
router.post('/register', add);
router.post('/agregarInv', agregarInv);

async function agregarInv(req, res, next) {
    try {
        const agregar = await controller.agregarInv(req.body);
        responses.success(req, res, 'Item added succesfully', 200)
    } catch (error) {
        next(error);
    }
}

async function all (req, res, next) {
    try {
        const all = await controller.all();
        responses.success(req, res, all,200);
    } catch (error) {
        next(error)
    }
}

async function add (req, res, next) {
    try {
        const all = await controller.add(req.body);
        responses.success(req, res, message, 201);
    } catch (error) {
        next(error)
    }
}

module.exports = router;