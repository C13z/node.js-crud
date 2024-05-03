const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole} = require('../middlewares');
const { crearCategoria, actualizarCategoria, obtenerCategorias, obtenerCategoria, borrarCategoria } = require('../controllers/ctg-control');
const { existeCategoriaPorId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/categorias
 */

// Obtener todas las categorias - público
router.get('/', [
    validarCampos,
], obtenerCategorias)

// Obtener una categoria por id - público
router.get('/:id', [
    check('id', 'No pertenece a ninguna ID de categoria').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
], obtenerCategoria)

// Crear categoría - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
], crearCategoria)

// Actualizar categoria - privado - cualquiera con token válido
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
], actualizarCategoria)

// Borrar categoria - estado: false
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
], borrarCategoria)

module.exports = router;









