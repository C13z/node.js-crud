const { Router } = require("express");
const { buscar } = require("../controllers/bcr-control");

const router = Router();

router.get('/:coleccion/:termino', buscar)

module.exports = router;