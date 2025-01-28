const Encuesta = require('../../models/encuestas')

const obtenerEncuestas = async (req, res) => {
    try {
        
        const usuarioId = req.usuario.id; // ID del usuario autenticado desde el token

        // Filtrar las encuestas por el ID del usuario autenticado
        const encuestas = await Encuesta.find({ autor: usuarioId });

        res.status(200).json(encuestas);
    } catch (error) {
        console.error('Error al obtener las encuestas:', error);
        res.status(500).json({ message: 'Ocurrió un error al obtener las encuestas' });
    }
};


const crearEncuesta = async (req, res) => {
    const { nombre, descripcion, preguntas } = req.body;
    
    if (!nombre || !descripcion || !Array.isArray(preguntas)) {
        return res.status(400).json({ message: 'Datos incompletos o inválidos' });
    }

    try {
        console.log('Valor de req.usuario en el controlador:', req.usuario);
        if (!req.usuario || !req.usuario.id) {
            return res.status(401).json({ message: 'Usuario no autenticado' });
        }
        const usuarioId = req.usuario.id;
        const nuevaEncuesta = new Encuesta({ nombre, descripcion, preguntas,autor: usuarioId });
        await nuevaEncuesta.save();
        res.status(201).json({ message: 'Encuesta guardada exitosamente' });
    } catch (error) {
        console.error('Error al guardar la encuesta:', error);
        res.status(500).json({ message: 'Ocurrió un error al guardar la encuesta' });
    }
};

const obtenerEncuesta = async (req, res) => {
    try {
        const encuesta = await Encuesta.findById(req.params.id);
        if (!encuesta) return res.status(404).json({ message: 'Encuesta no encontrada' });
        res.json(encuesta);
    } catch (error) {
        console.error('Error al obtener encuesta:', error);
        res.status(500).json({ message: 'Ocurrió un error al obtener la encuesta' });
    }
};

async function actualizarEncuesta(req, res) {
    try {
        const encuestaId = req.params.id; // Obtener el ID de la encuesta desde los parámetros
        const datosActualizados = req.body; // Obtener los datos actualizados desde el cuerpo de la solicitud

        // Buscar la encuesta por ID y actualizarla
        const encuestaActualizada = await Encuesta.findByIdAndUpdate(encuestaId, datosActualizados, {
            new: true, // Devuelve el documento actualizado
            runValidators: true, // Ejecuta las validaciones del modelo
        });

        if (!encuestaActualizada) {
            return res.status(404).json({ message: 'Encuesta no encontrada.' });
        }

        res.json({
            message: 'Encuesta actualizada correctamente.',
            encuesta: encuestaActualizada,
        });
    } catch (error) {
        console.error('Error al actualizar la encuesta:', error);
        res.status(500).json({ message: 'Error al actualizar la encuesta.', error });
    }
};

const eliminarEncuesta = async (req, res) => {
    try {
        const { id } = req.params;
        const encuestaEliminada = await Encuesta.findByIdAndDelete(id);
        if (!encuestaEliminada) {
            return res.status(404).json({ message: 'Encuesta no encontrada' });
        }
        res.json({ message: 'Encuesta eliminada con éxito' });
    } catch (error) {
        console.error('Error al eliminar encuesta:', error);
        res.status(500).json({ message: 'Ocurrió un error al eliminar la encuesta' });
    }
};

async function obtenerEncuestaPorId(req, res) {
    try {
        const idEncuesta = req.params.id;

        // Buscar la encuesta por su ID
        const encuesta = await Encuesta.findById(idEncuesta);

        if (!encuesta) {
            return res.status(404).json({ message: 'Encuesta no encontrada' });
        }

        // Estructura del objeto a devolver
        const encuestaConFormato = {
            id: encuesta._id,
            nombre: encuesta.nombre,
            descripcion: encuesta.descripcion,
            preguntas: encuesta.preguntas.map(pregunta => ({
                texto: pregunta.texto,
                tipo: pregunta.tipo,
                opciones: pregunta.tipo === 'opcion-multiple' ? pregunta.opciones : [],
            })),
        };

        // Devolver la encuesta en formato JSON
        res.json(encuestaConFormato);
    } catch (error) {
        console.error('Error al obtener la encuesta:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = {
    obtenerEncuestas,
    crearEncuesta,
    obtenerEncuesta,
    actualizarEncuesta,
    eliminarEncuesta,
    obtenerEncuestaPorId
};