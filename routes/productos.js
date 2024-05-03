const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT, esAdminRole } = require('../middlewares/');

const { crearProducto,
    obtenerProductos,
    actualizarProducto,
    borrarProducto,
    obtenerProducto } = require('../controllers/prod-control');

const { existeProductoPorId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/productos
 */

// Crear producto - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria es obligatoria').not().isEmpty(),
    validarCampos
], crearProducto);

// Obtener todas los productos - público
router.get('/', [
    validarCampos
], obtenerProductos)

// Obtener un producto por ID - público
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
], obtenerProducto)

// Actualizar producto - privado - cualquiera con token válido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], actualizarProducto)

// Borrar producto - estado: false
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
], borrarProducto)


module.exports = router;