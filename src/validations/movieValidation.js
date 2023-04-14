const { check, validationResult } = require("express-validator");

module.exports = [
  check("title").notEmpty().withMessage("Tenes que ingresar un titulo"),
  check("rating")
    .notEmpty()
    .withMessage("Tenes que ingresar un rating")
    .bail()
    .isNumeric()
    .withMessage("No es un numero"),
  check("awards")
    .notEmpty()
    .withMessage("Tenes que ingresar una cantidad de premios")
    .bail()
    .isInt()
    .withMessage("No es un numero"),
  check("release_date")
    .notEmpty()
    .withMessage("Tenes que ingresar una fecha")
    .bail()
    .isDate()
    .withMessage("No es una fecha"),
  check("length")
    .notEmpty()
    .withMessage("Tenes que ingresar una duracion")
    .bail()
    .isInt()
    .withMessage("No es un numero"),
  check("genre_id").notEmpty().withMessage("Tenes que elegir un genero"),
];
