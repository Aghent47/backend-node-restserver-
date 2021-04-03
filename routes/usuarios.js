const { Router } = require('express'); // desestructurar para llamar de routes
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { esRolValido, emailExciste, existeUsuarioId } = require('../helpers/db-validators');

const router = Router();

router.get('/', usuariosGet); //usuarioGet no se ejecuta solo mando referencia a la misma.

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    check('rol').custom(esRolValido),
    validarCampos,
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), //validandole que el nombre NO este vacio
    check('correo', 'El correo no es valido!!!').isEmail(),
    check('correo').custom(emailExciste),
    check('password', 'La contraseña es obligatoria y mas de 6 caracteres!!!').isLength({ min: 6 }),
    // check('rol', 'No es un ROL valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    //  check('rol').custom((rol) => esRolValido(rol)),
    check('rol').custom(esRolValido),
    validarCampos,
], usuariosPost);

router.delete('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;