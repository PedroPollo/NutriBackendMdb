const express = require('express');
const morgan = require('morgan');
const config = require('./config');
const cors = require('cors');

const inv = require('./modules/inv/rutas');
const enc = require('./modules/enc/rutas');
const auth = require('./modules/auth/rutas');
const encuestas = require('./modules/encuestas/rutas');
const usuarios = require('./modules/usuarios/rutas');
const error = require('./net/errors');

const app = express();

//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Confiiguracion de la app
app.set('port', config.app.port);

//Rutas
app.use('/api/auth', auth);
app.use('/api/enc', enc);
app.use('/api/inv', inv);
app.use('/api/encuestas', encuestas);
app.use('/api/usuarios', usuarios);

//Errores personalizados
app.use(error);

module.exports = app;