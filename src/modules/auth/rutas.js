const express = require('express');

const responses = require('../../net/responses');
const controller = require('./index');

const router = express.Router();

router.post('/login', all);
router.get('/', aceptados);

async function all(req, res, next) {
    try {
        username = req.body.usuario
        const Token = await controller.login(username, req.body.password);
        const usuario = await controller.getUser(username);
        usuario.token = Token
        responses.success(req, res, usuario, 200)
    } catch (err) {
        next(err);
    }
}

async function aceptados(req, res, next) {
    try {
        const all = await controller.all();
        responses.success(req, res, all,200);
    } catch (error) {
        next(error)
    }
}

module.exports = router;