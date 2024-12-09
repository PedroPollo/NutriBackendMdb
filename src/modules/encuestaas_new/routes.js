const express = require('express');
const router = express.Router();
const { obtenerEncuestas, eliminarEncuesta, obtenerEncuesta, actualizarEncuesta, crearEncuesta } = require('./controler');
const verificarToken = require('../../middleware/authMiddelware');
router.get('/obtener-encuestas', verificarToken, obtenerEncuestas);
router.post('/crearEncuesta',verificarToken ,crearEncuesta);
router.get('/obtenerEncuesta',obtenerEncuesta);
router.put('/actualizarEncuesta',actualizarEncuesta);
router.delete('/eliminarEncuesta/:id',eliminarEncuesta)
module.exports = router;