const express = require('express');
const morgan = require('morgan');
const config = require('./config');
const cors = require('cors'); // Importar cors

const inv = require('./modules/inv/rutas');
const enc = require('./modules/enc/rutas');
const auth = require('./modules/auth/rutas');
const usuarios = require('./modules/usuarios/authRoutes');
const encuestas = require('./modules/encuestas/rutas');
const encuestas_new = require('./modules/encuestas_new/routes');
const error = require('./net/errors');
const path = require('path');


const app = express();

// Habilitar CORS
app.use(cors()); // Aquí se habilita CORS para todas las solicitudes

// Configuración de la carpeta estática
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de la app
app.set('port', config.app.port);

// Rutas
app.use('/api/auth', auth);
app.use('/api/enc', enc);
app.use('/api/inv', inv);
app.use('/api/encuestas', encuestas);
app.use('/api/usuarios', usuarios);
app.use('/api/encuestas_new',encuestas_new)

// Errores personalizados
app.use(error);

module.exports = app;
