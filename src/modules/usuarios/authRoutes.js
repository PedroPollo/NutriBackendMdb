

const express = require('express');
const router = express.Router();
const { registrarUsuario, iniciarSesion, pendientes, actualizar_estado, pendientes_encuestadores, actualizar_estado_encuestadores } = require('./controler'); // Asegúrate de que sea 'controller.js' o que esté correcto
const verificarToken = require('../../middleware/authMiddleware');
// Ruta para registro de usuario
router.post('/registro', registrarUsuario); // Asegura que el método está bien definido
router.post('/login', iniciarSesion);
router.get('/pendientes-encuestadores', verificarToken, pendientes_encuestadores);
router.put('/actualizar-estado-encuestadores/:id', actualizar_estado_encuestadores);
router.get('/pendientes', pendientes);
router.put('/actualizar-estado/:id', actualizar_estado);
router.get('/ruta-protegida', verificarToken, (req, res) => {
    res.json({
        message: 'Acceso autorizado a datos protegidos',
        datos: { info: 'Este es un ejemplo de datos protegidos' },
        usuario: req.usuario // Esto devuelve la información decodificada del token
    });
});

module.exports = router;
