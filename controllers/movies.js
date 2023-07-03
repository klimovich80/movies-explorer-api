const movieModel = require('../models/movie');
const { errorHandler, CREATED_STATUS } = require('./errors');

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

const getSavedMovie = () => {

};

const deleteMovie = () => {

};

module.exports = { createMovie, getSavedMovie, deleteMovie };
