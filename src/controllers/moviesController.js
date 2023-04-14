const path = require("path");
const db = require("../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const { error } = require("console");

//Aqui tienen una forma de llamar a cada uno de los modelos
// const {Movies,Genres,Actor} = require('../database/models');

//Aquí tienen otra forma de llamar a los modelos creados
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;

const moviesController = {
  list: (req, res) => {
    db.Movie.findAll().then((movies) => {
      res.render("moviesList.ejs", { movies });
    });
  },
  detail: (req, res) => {
    db.Movie.findByPk(req.params.id).then((movie) => {
      res.render("moviesDetail.ejs", { movie });
    });
  },
  new: (req, res) => {
    db.Movie.findAll({
      order: [["release_date", "DESC"]],
      limit: 5,
    }).then((movies) => {
      res.render("newestMovies", { movies });
    });
  },
  recomended: (req, res) => {
    db.Movie.findAll({
      where: {
        rating: { [db.Sequelize.Op.gte]: 8 },
      },
      order: [["rating", "DESC"]],
    }).then((movies) => {
      res.render("recommendedMovies.ejs", { movies });
    });
  },
  //Aqui dispongo las rutas para trabajar con el CRUD
  add: async function (req, res) {
    const genres = await db.Genre.findAll();

    return res.render("moviesAdd", { genres });
  },
  create: async function (req, res) {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      const movie = await db.Movie.create(req.body);

      return res.redirect("/movies/detail/" + movie.id);
    } else {
      return res.json(errors.mapped());
    }
  },
  edit: async function (req, res) {
    const genres = await db.Genre.findAll();
    const Movie = await db.Movie.findByPk(req.params.id);

    return res.render("moviesEdit", { Movie, genres });
  },
  update: function (req, res) {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      db.Movie.update(req.body, {
        where: {
          id: req.params.id,
        },
      }).then((movie) => res.redirect("/movies/detail/" + req.params.id));
    } else {
      return res.json(errors.mapped());
    }
  },
  delete: async function (req, res) {
    const Movie = await db.Movie.findByPk(req.params.id);

    return res.render("moviesDelete", { Movie });
  },
  destroy: async function (req, res) {
    await db.Movie.destroy({ where: { id: req.params.id } });

    return res.redirect("/movies");
  },
};

module.exports = moviesController;
