// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken'); // Supongamos que usas JWT

function verificarToken(req, res, next) {
    const token = req.headers['authorization']; // Obtén el token del encabezado
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        // Verifica el token con la clave secreta
        const decoded = jwt.verify(token, 'nutricion_UAZ'); 
        req.usuario = decoded; // Guarda los datos decodificados en la solicitud
        next(); // Continúa hacia la ruta protegida
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido o expirado' });
    }
}

module.exports = verificarToken;
