const express = require('express');
const router = express.Router();
const { obtenerEncuestas, eliminarEncuesta, obtenerEncuesta, actualizarEncuesta, crearEncuesta,obtenerEncuestaPorId } = require('./controler');
const verificarToken = require('../../middleware/authMiddelware');
router.get('/obtener-encuestas', verificarToken, obtenerEncuestas);
router.post('/crearEncuesta',verificarToken ,crearEncuesta);
router.get('/obtenerEncuesta',obtenerEncuesta);
router.put('/actualizarEncuesta/:id',actualizarEncuesta);
router.get('/editar/:id', obtenerEncuestaPorId);

router.delete('/eliminarEncuesta/:id',eliminarEncuesta);
const EncuestaAplicada = require('../../models/respuestas');
const Encuesta = require('../../models/encuestas');
router.get('/:id', verificarToken, async (req, res) => {
    try {
        const { id } = req.params;

        // Obtener la encuesta por ID
        const encuesta = await Encuesta.findById(id);
        if (!encuesta) {
            return res.status(404).json({ message: 'Encuesta no encontrada' });
        }

        const preguntas = encuesta.preguntas;

        // Obtener las respuestas asociadas
        const respuestasAplicadas = await EncuestaAplicada.find({ id_encuesta: id });

        // Asociar preguntas con sus respuestas
        const detalleRespuestas = preguntas.map(pregunta => {
            const respuestasParaPregunta = respuestasAplicadas.flatMap(encuestaAplicada =>
                encuestaAplicada.respuestas.filter(r => r.id_pregunta.equals(pregunta._id))
            );
        
            return {
                pregunta: pregunta.texto,
                tipo: pregunta.tipo, // Incluir el tipo de la pregunta
                opciones: pregunta.opciones || [], // Incluir las opciones si existen (para preguntas de opción múltiple)
                respuestas: respuestasParaPregunta.map(r => r.respuesta),
            };
        });
        

        res.status(200).json({
            nombre: encuesta.nombre,
            descripcion: encuesta.descripcion,
            respuestas: detalleRespuestas,
        });
    } catch (error) {
        console.error('Error al obtener las respuestas:', error);
        res.status(500).json({ message: 'Error al obtener las respuestas' });
    }
});

module.exports = router;