const bcrypt = require('bcryptjs');
const auth = require('../../auth');
const querys = require('../../mdb/mongo');
const controller = require('../auth/index');
const mongoose = require('mongoose');

module.exports =  function(dbintectada) {

    let db = dbintectada

    if (!db) {
        db = require('../../DB/mysql');
    }

    function all(){
        return querys.all(querys.Encuestador)
    }

    function agregarInv(body) {
        const index = {
            id_encuestador: body.enc_id,
            id_investigador: body.inv_id,
            validador: false
        }
        querys.add(querys.Validador, index)
    }

    async function add(body) {
        const usuario = {
            matricula: body.matricula,
            nombre: body.nombre,
            username: body.username,
            password: await bcrypt.hash(body.password.toString(), 5),
        }
        const respuesta = await querys.add(querys.Encuestador, usuario);

        const resp = await controller.getUser(body.username);
        var insertId = resp.id

        const index = {
            id_encuestador: insertId,
            id_investigador: body.investigadorId,
            validador: false
        }
        querys.add(querys.Validador, index)
    }

    return {
        all,
        add,
        agregarInv,
    }
}