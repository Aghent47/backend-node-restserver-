//archivo para crear funciones y exportalas
const { response } = require('express');

const usuariosGet = (req = request, res = response) => {
    const { q, apellido, nombre = 'No Name', cc } = req.query;

    res.json({
        message: 'Get API - controlador',
        q,
        nombre,
        apellido,
        cc
    })
}

const usuariosPost = (req, res = response) => {
    const { nombre, id } = req.body; // desestructurando datos provenientes del frontend 

    res.json({
        message: 'post API - controlador',
        nombre,
        id
    })
}

const usuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        //   ok: false,
        message: 'put API - controlador',
        id
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        //   ok: false,
        message: 'patch API- controlador'
    })
}

const usuariosDelete = (req, res = response) => {
    res.json({
        //   ok: false,
        message: 'Delete API - controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosDelete,
    usuariosPatch,
    usuariosPost,
    usuariosPut
}