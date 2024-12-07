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
        try {
            const authData = {
                nom_usuario: body.nom_usuario,
                apellidos_usuario: body.apellidos_usuario,
                identificador: body.identificador,
                correo_ins: body.correo_ins,
                correo_alter: body.correo_alter,
            }
            if (body.contr) {
                authData.contr = await bcrypt.hash(body.contr.toString(), 5);
            }
            return querys.add(querys.Investigador, authData);
        } catch (e) {
            throw e;
        }
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
        const { id } = req.params.id;
        const { aceptado } = req.body

        if (aceptado) {
            await querys.actualizar(querys.Investigador, id, {aceptado: true})
            return 'Investigador Aceptado';
        } else {
            await querys.del(querys.Investigador, id)
            return 'Investigador eliminado';
        }
    }

    async function encuestadores(req) {
        try {
            consulta = {
                id_investigador: req.params.id,
                validador: false
            }
            const resp = await querys.query(querys.Validador, consulta)
            const ids = [...new Set(resp.map(validador => validador.id_encuestador))];
            consulta = {
                _id: { $in: ids }
            }
            const encuestadores = await querys.query(querys.Encuestador, consulta);
            console.log(resp);
            console.log(encuestadores);

            const resultado = resp.map(item => {
                const encuestador = encuestadores.find(enc => enc._id.equals(item.id_encuestador)); // Comparar ObjectId
                if (encuestador) {
                    return {
                    _id: item._id,
                    matricula: encuestador.matricula,
                    nombre: encuestador.nombre
                    };
                }
                return null; // Si no hay coincidencia, devolver null (puedes manejar esto como prefieras)
              }).filter(item => item !== null); // Eliminar nulos si los hay
            
            console.log(resultado);
            
            return resultado;
        } catch (error) {
            throw error;
        }
    }

    async function aceptarEncuestador(body) {
        try {
            const { validador } = body
            console.log(validador)
            if (validador) {
                await querys.actualizar(querys.Validador, body.id, {validador: true});
                return 'Encuestador agergado correctamente';
            } else {
                await querys.del(querys.Validador, body.id)
                return 'Se elimino al encuestador'
            }
        } catch (error) {
            throw error;
        }
    }

    return {
        registrarUsuario,
        iniciarSesion,
        pendientes,
        actualizar_estados,
        encuestadores,
        aceptarEncuestador,
    }

}