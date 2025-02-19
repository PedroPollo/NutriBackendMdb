const bcrypt = require('bcryptjs');
const Usuario = require('../../models/invModel'); // Importa el modelo Usuario

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'nutricion_UAZ';
const registrarUsuario = async (req, res) => {
    try {
        const { nom_usuario, apellidos_usuario, identificador, correo_ins, contr, contr_2 } = req.body;

        // Validar contraseñas
        if (contr !== contr_2) {
            return res.json({ success: false, message: 'Las contraseñas no coinciden.' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(contr, 10);

        // Crear un nuevo usuario usando el modelo
        const nuevoUsuario = new Usuario({
            nom_usuario,
            apellidos_usuario,
            identificador,
            correo_ins,
            contr: hashedPassword
        });

        // Guardar el nuevo usuario en la base de datos
        await nuevoUsuario.save();

        res.json({ success: true, message: 'Usuario registrado exitosamente.' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.json({ success: false, message: 'Error al registrar usuario.' });
    }
};

const iniciarSesion = async (req, res) => {
    try {
        const { correo_ins, contr } = req.body;

        // Buscar el usuario en la base de datos
        const usuario = await Usuario.findOne({ correo_ins });
        if (!usuario) {
            return res.json({ success: false, message: 'Usuario no encontrado.' });
        }

        // Verificar si el usuario ha sido aceptado
        if (!usuario.aceptado) {
            return res.json({ 
                success: false, 
                message: 'Usuario no aceptado.', 
                redirect: './saladeespera.html' // Enviar una indicación para redirigir
            });
        }

        // Comparar la contraseña ingresada con la contraseña hasheada
        const isMatch = await bcrypt.compare(contr, usuario.contr);
        if (!isMatch) {
            return res.json({ success: false, message: 'Contraseña incorrecta.' });
        }

        // Crear un token JWT con información del usuario
        const token = jwt.sign({ id: usuario._id, correo: usuario.correo_ins }, JWT_SECRET, { expiresIn: '1h' });

        // Devolver el token al cliente
        res.json({ success: true, token });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.json({ success: false, message: 'Error en el inicio de sesión.' });
    }
};

const pendientes = async (req, res) => {
    try {
        const usuariosPendientes = await Usuario.find({ aceptado: false }); 
        res.json(usuariosPendientes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios pendientes' });
    }
};

const actualizar_estado = async (req, res) => {
    const { id } = req.params;
    const { aceptado } = req.body; // true para aceptar, false para rechazar

    try {
        if (aceptado) {
            // Actualiza el estado a aceptado
            await Usuario.findByIdAndUpdate(id, { aceptado: true });
            res.json({ message: 'Usuario aceptado con éxito.' });
        } else {
            // Elimina el usuario si se rechaza
            await Usuario.findByIdAndDelete(id);
            res.json({ message: 'Usuario rechazado y eliminado con éxito.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el estado del usuario.' });
    }
};

const isAccepted = require('../../models/acceptedModel');
const pendientes_encuestadores = async (req, res) => {
    const investigadorId =  req.investigadorId;
    try {
    
        const encuestadoresPendientes = await isAccepted.find({ id_investigador: investigadorId, validador: false })
            .populate('id_investigador', 'nom_usuario') // Opcional
            .populate('id_encuestador', 'nombre matricula'); // Opcional
        res.json(encuestadoresPendientes);

    } catch (error) {
        res.status(500).json({ message: 'Error al obtener encuestadores pendientes' });
    }
};

// Actualizar el estado de un encuestador
const actualizar_estado_encuestadores = async (req, res) => {
    const { id } = req.params;
    const { aceptado } = req.body; // true para aceptar, false para rechazar

    try {
        if (aceptado) {
            // Actualiza el estado a validado
            await isAccepted.findByIdAndUpdate(id, { validador: true });
            res.json({ message: 'Encuestador aceptado con éxito.' });
        } else {
            // Elimina el registro si se rechaza
            await isAccepted.findByIdAndDelete(id);
            res.json({ message: 'Encuestador rechazado y eliminado con éxito.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el estado del encuestador.' });
    }
};
const ruta_protegida = async (req, res) => {
    try {
        const correo_ins = req.usuario.correo; // Extrae el correo del usuario autenticado
        const usuario_all = await Usuario.findOne({ correo_ins }); // Busca el usuario en la base de datos

        if (!usuario_all) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Retorna el nombre de usuario al frontend
        res.json({ nombre_usuario: usuario_all.nom_usuario });
    } catch (error) {
        console.error('Error al obtener el nombre de usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


module.exports = { 
    pendientes_encuestadores,
    actualizar_estado_encuestadores,
    registrarUsuario, 
    iniciarSesion,
    pendientes,
    actualizar_estado,
    ruta_protegida
 };