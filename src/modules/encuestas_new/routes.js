const express = require('express');
const router = express.Router();
const { obtenerEncuestas, eliminarEncuesta, obtenerEncuesta, actualizarEncuesta, crearEncuesta } = require('./controler');
router.get('/obtener-encuestas', obtenerEncuestas);
router.post('/crearEncuesta',crearEncuesta);
router.get('/obtenerEncuesta',obtenerEncuesta);
router.put('/actualizarEncuesta',actualizarEncuesta);
router.delete('/eliminarEncuesta/:id',eliminarEncuesta)
module.exports = router;