const router = require('express').Router();

const {
  createMovie, getSavedMovie, deleteMovie,
} = require('../controllers/movies');

const {
  validateCreateMovie,
  validateMovieId,
} = require('../middlewares/validate');

module.exports = router;
// создаёт фильм с переданными в теле
// country, director, duration, year, description, image, trailer, nameRU,
// nameEN и thumbnail, movieId
router.post('/', validateCreateMovie, createMovie);
// возвращает все сохранённые текущим  пользователем фильмы
router.get('/', getSavedMovie);
// удаляет сохранённый фильм по id
router.delete('/:_id', validateMovieId, deleteMovie);
