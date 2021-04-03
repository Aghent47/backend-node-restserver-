//archivo para crear funciones y exportalas
const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/Usuario');

const usuariosGet = async(req = request, res = response) => {
    //const { q, apellido, nombre = 'No Name', cc } = req.query;
    const {limite = 5, desde = 0} = req.query;
    const query = {estado:true};

/*     const usuarios = await Usuario.find(query)
    .skip(Number(desde))
    .limit(Number(limite));
    const total  = await Usuario.countDocuments(query);
     */
    const [total, usuarios] = await Promise.all([//ejecuta la coleccion de promesas de manera simultanea
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
      total, 
      usuarios
    })
}

const usuariosPost = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body; // desestructurando datos provenientes del frontend 

    const usuario = new Usuario({
        nombre,
        correo,
        password,
        rol
    }); // Creando una nueva instacia del usuario 

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardas en BD
    await usuario.save();

    res.json({
        message: 'post API - controlador',
        usuario
    })
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO validar contra BD
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario)
}

const usuariosPatch = (req, res = response) => {
    res.json({
        //   ok: false,
        message: 'patch API- controlador'
    })
}

const usuariosDelete = async(req, res = response) => {

    const {id} = req.params;

    //Borrado fisicamente de DDB NO RECOMENSABLE
    /* const usuario = await Usuario.findByIdAndDelete(id); */


    //Borrado fisicamente de DDB RECOMENDABLE
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});

    res.json(usuario);
}

module.exports = {
    usuariosGet,
    usuariosDelete,
    usuariosPatch,
    usuariosPost,
    usuariosPut
}