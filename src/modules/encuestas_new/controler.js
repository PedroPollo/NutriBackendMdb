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

const actualizarEncuesta = async (req, res) => {
    try {
        const encuestaActualizada = await Encuesta.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!encuestaActualizada) return res.status(404).json({ message: 'Encuesta no encontrada' });
        res.json(encuestaActualizada);
    } catch (error) {
        console.error('Error al actualizar encuesta:', error);
        res.status(500).json({ message: 'Ocurrió un error al actualizar la encuesta' });
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

module.exports = {
    obtenerEncuestas,
    crearEncuesta,
    obtenerEncuesta,
    actualizarEncuesta,
    eliminarEncuesta,
};
