const express = require('express');
const router = express.Router();
const { obtenerEncuestas, eliminarEncuesta, obtenerEncuesta, actualizarEncuesta, crearEncuesta,obtenerEncuestaPorId, descargarEncuesta, verEncuesta } = require('./controler');
const verificarToken = require('../../middleware/authMiddelware');
router.get('/obtener-encuestas', verificarToken, obtenerEncuestas);
router.post('/crearEncuesta',verificarToken ,crearEncuesta);
router.get('/obtenerEncuesta',obtenerEncuesta);
router.put('/actualizarEncuesta/:id',actualizarEncuesta);
router.get('/editar/:id', obtenerEncuestaPorId);
router.delete('/eliminarEncuesta/:id',eliminarEncuesta);
router.get('/descargar/:id', verificarToken,descargarEncuesta);
router.get('/ver/:id',verificarToken,verEncuesta);


module.exports = router;