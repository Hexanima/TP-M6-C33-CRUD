const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');
const movieValidation = require("../validations/movieValidation")

router.get('/', moviesController.list);
router.get('/new', moviesController.new);
router.get('/recommended', moviesController.recomended);
router.get('/detail/:id', moviesController.detail);
//Rutas exigidas para la creación del CRUD

//Agregar pelicula
router.get('/add', moviesController.add);
router.post('/create', movieValidation, moviesController.create);

//Editar pelicula
router.get('/edit/:id', moviesController.edit);
router.put('/update/:id', movieValidation, moviesController.update);

//Eliminar pelicula
router.get('/delete/:id', moviesController.delete);
router.delete('/delete/:id', moviesController.destroy);

module.exports = router;