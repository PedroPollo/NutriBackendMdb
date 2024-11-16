const bcrypt = require('bcryptjs');
const auth = require('../../auth');
const querys = require('../../mdb/mongo');
const { default: mongoose } = require('mongoose');

module.exports = function(dbinyectada) {
    let db = dbinyectada;

    if (!db){
        db = require('../../mdb/mongo')
    }

    async function add(body) {
        const authData = {
            id: body.id,
        }
        if (body.usuario) {
            authData.username = body.usuario
        }
        if (body.password) {
            authData.password = await bcrypt.hash(body.password.toString(), 5)
        }
        return querys.add(querys.Encuestador, authData);
    }

    async function login(usuario, password) {
        const data = await querys.queryOne(querys.Encuestador, {username: usuario});
        if (data) {
            return bcrypt.compare(password, data.password)
            .then(resultado => {
                if (resultado === true) {
                    return auth.asignarToken({...data});
                } else {
                    throw new Error('Informacion invalida');
                }
            });
        } else {
            throw new Error('Credenciales invalidas usuername');
        }
    }

    async function all() {
        return await querys.all(querys.Validador);
    }

    async function getUser(usuario) {
        // Consulta el usuario en la base de datos
        const data = await querys.queryOne(querys.Encuestador, { username: usuario });
        // Verifica si se encontró el usuario
        if (!data) {
            throw new Error('Usuario no encontrado'); // Lanza un error si no se encuentra el usuario
        }
    
        // Si se encuentra el usuario, recuperamos su ID
        const id = data._id.toString();
        
        // Consulta los validadores relacionados
        const cons = await querys.query(querys.Validador, { id_encuestador: id, validador: true });
    
        // Determina si el usuario está aceptado
        var accepted = false;
        var investigadores = [];
        if (cons && cons.length !== 0) {
            accepted = true;
            for (let inv of cons) { // Usa 'for...of' para iterar correctamente
                investigadores.push(inv.id_investigador); // Usa 'push' en lugar de 'append'
            }
        }

        // Crea el objeto del usuario con la información relevante
        const user = {
            id: id.toString(),
            matricula: data.matricula,
            nombre: data.nombre,
            usuario: data.username,
            password: data.password,
            isAccepted: accepted,
            researchers: investigadores
        };
    
        // Retorna el objeto del usuario
        return user;
    }

    return {
        add,
        login,
        getUser,
        all,
    }
}