// En el registro agregar comparador de contraseñas 1 y 2
const express = require('express');
const jwt = require('jsonwebtoken');

const responses = require('../../net/responses');
const controller = require('./index');
const verificarToken = require('../../middleware/authMiddleware')

const router = express.Router();

router.post('/registro', registrarUsuario); // Asegura que el método está bien definido
router.post('/login', iniciarSesion);
router.get('/pendientes', pendientes);
router.put('/actualizar-estado/:id', actualizar_estado);
router.get('/encuestadores/:id', encuestadores);
router.put('/aceptar-encuestadores', aceptarEnc);

router.get('/ruta-protegida', verificarToken, (req, res) => {
    res.json({
        message: 'Acceso autorizado a datos protegidos',
        datos: { info: 'Este es un ejemplo de datos protegidos' },
        usuario: req.usuario // Esto devuelve la información decodificada del token
    });
});

async function encuestadores(req, res, next) {
    try {
        const response = await controller.encuestadores(req)
        responses.success(req, res, response, 200)
    } catch (error) {
        next(error);
    }
}

async function aceptarEnc(req, res, next) {
    try {
        const result = await controller.aceptarEncuestador(req.body)
        responses.success(req, res, result, 200);
    } catch (error) {
        next(error);
    }
}

async function registrarUsuario(req, res, next) {
    try {
        if (req.body.contr !== req.body.contr_2) {
            return responses.error(req, res, 'Las contraseñas no coinciden', 500)
        }
        const all = await controller.registrarUsuario(req.body);
        responses.success(req, res, 'Usuario creado exitosamente', 200);
    } catch (error) {
        next(error);
    }
}

async function iniciarSesion(req, res, next){
    try {
        const Token = await controller.iniciarSesion(req.body.correo_ins, req.body.contr)
        responses.success(req, res, Token, 200);
    } catch (error) {
        next(error);
    }
}

async function pendientes(req, res, next) { 
    try {
        const usuarioPendientes = await controller.pendientes();
        responses.success(req, res, usuarioPendientes, 200);
    } catch (error) {
        next(error);
    }
}

async function actualizar_estado(req, res, next) {
    try {
        const message = await controller.actualizar_estados(req)
        responses.success(req, res, message, 200);
    } catch (error) {
        next(error);
    }
}

module.exports = router;