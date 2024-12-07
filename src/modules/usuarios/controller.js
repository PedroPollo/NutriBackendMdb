const querys = require('../../mdb/mongo');
const bcrypt = require('bcryptjs');
const auth = require('../../auth');
const { default: mongoose } = require('mongoose');

module.exports = function(dbinyectada) {
    let db = dbinyectada

    if (!db) {
        db = require('../../mdb/mongo');
    }

    async function registrarUsuario(body) {
        const authData = {
            nom_usuario: body.nom_usuario,
            apellidos_usuario: body.apellidos_usuario,
            identificador: body.identificador,
            correo_ins: body.correo_ins,
            correo_alter: body.correo_alter,
        }
        if (body.contr) {
            authData.contr = await bcrypt.hash(body.password.toString(), 5);
        }
        return querys.add(querys.Investigador, authData);
    }

    async function iniciarSesion(correo_ins, contr) {
        const data = await querys.queryOne(querys.Investigador, {correo_ins: correo_ins});
        if (data) {
            return bcrypt.compare(contr, data.contr)
            .then(resultado => {
                if (resultado === true) {
                    return auth.asignarToken({...data});
                } else {
                    throw new Error('Informacion Invalida');
                }
            });
        } else {
            throw new Error('Usuario No existe');
        }
    }
    
    async function pendientes() {
        return await querys.query(querys.Investigador, {aceptado: false});
    }

    async function actualizar_estados(req) {
        const { id } = req.params;
        const { aceptado } = rq.body

        if (aceptado) {
            await querys.actualizar(querys.Investigador, id, {aceptado: true})
            return 'Investigador Aceptado';
        } else {
            await querys.del(querys.Investigador, id)
            return 'Investigador eliminado';
        }
    }

    return {
        registrarUsuario,
        iniciarSesion,
        pendientes,
        actualizar_estados,
    }

}