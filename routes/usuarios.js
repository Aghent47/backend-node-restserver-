const { Router } = require('express'); // desestructurar para llamar de routes
const router = Router();
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');


router.get('/', usuariosGet); //usuarioGet no se ejecuta solo mando referencia a la misma.

router.put('/:id', usuariosPut);

router.post('/', usuariosPost);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);





module.exports = router;