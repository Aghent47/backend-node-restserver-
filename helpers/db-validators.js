const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async(rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} No existe en BD`);
    }
}

// Verificar si el correo Existe
const emailExciste = async(correo = '') => {

    const existEmail = await Usuario.findOne({ correo });
    if (existEmail) {
        throw new Error(`El Correo ${correo}, Ya existe en la Base de Datos`);
    }
}

// Verificar si existe Usuario por ID
const existeUsuarioId = async(id) => {

    const existUsuarioId = await Usuario.findById(id);
    if (!existUsuarioId) {
        throw new Error(`El id ${id}, No existe en la Base de Datos`);
    }
}


module.exports = {
    esRolValido,
    emailExciste,
    existeUsuarioId
}