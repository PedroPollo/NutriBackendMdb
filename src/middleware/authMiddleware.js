// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken'); // Supongamos que usas JWT

function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    // Soporta formatos con y sin "Bearer"
    const token = authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1] // Extrae el token después de "Bearer"
        : authHeader; // Toma directamente el token si no tiene "Bearer"
    try {
        const decoded = jwt.verify(token, 'nutricion_UAZ');
        req.usuario = decoded; // Asigna los datos decodificados a `req.usuario`
        req.investigadorId = decoded.id;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Token expirado' });
        }
        return res.status(403).json({ message: 'Token inválido' });
    }
}

module.exports = verificarToken;