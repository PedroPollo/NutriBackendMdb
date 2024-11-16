const responses = require('./responses');

function errors(err, req, res, next) {
    console.error('[error', err);
    
    const mesagge = err.mesagge || 'Internal error';
    const status = err.statusCode || 500;

    responses.error(req, res, mesagge, status);
}

module.exports = errors;