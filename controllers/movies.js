const { Error } = require('mongoose');
const movieModel = require('../models/movie');
const { errorHandler, OK_STATUS, CREATED_STATUS } = require('./errors');
const NotOwnerError = require('../errors/NotOwnerError');

const createMovie = (req, res, next) => {
  movieModel.create({
    owner: req.user._id,
    ...req.body,
  })
    .then((movie) => {
      res.status(CREATED_STATUS).send(movie);
    })
    .catch((err) => {
      errorHandler(err, next);
    });
};

const getSavedMovie = (req, res, next) => {
  movieModel.find({
    owner: req.user._id,
  })
    .then((movies) => res.status(OK_STATUS).send(movies))
    .catch((err) => errorHandler(err, next));
};

const deleteMovie = (req, res, next) => {
  const { _id } = req.params;

  movieModel
    .findById(_id)
    .orFail(() => {
      throw new Error.DocumentNotFoundError();
    })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new NotOwnerError('Вы можете удалить только сохранённый фильм');
      }
      movieModel.findByIdAndRemove(_id)
        .then((removedMovie) => {
          res.status(OK_STATUS).send(removedMovie);
        })
        .catch((err) => errorHandler(err, next));
    })
    .catch((err) => errorHandler(err, next));
};

module.exports = { createMovie, getSavedMovie, deleteMovie };
