const { celebrate, Joi } = require('celebrate');
const {
  httpRegExp, emailRegExp, engRegExp, rusRegExp,
} = require('../validation/validate');

const validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().min(2)
      .max(30)
      .regex(emailRegExp)
      .required(),
    password: Joi.string().min(2).required(),
  }),
});

const validateUserRegistration = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    email: Joi.string().email().min(2)
      .max(30)
      .regex(emailRegExp)
      .required(),
    password: Joi.string().min(2).required(),
    avatar: Joi.string().uri().regex(httpRegExp),
  }),
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().min(2)
      .required()
      .regex(emailRegExp),
    name: Joi.string().min(2).max(30),
  }),
});

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().min(2).max(30)
      .required()
      .regex(emailRegExp),
    name: Joi.string().min(2).max(30),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.date().required(),
    description: Joi.string().required(),
    image: Joi.string().uri().required().regex(httpRegExp),
    trailerLink: Joi.string().uri().required().regex(httpRegExp),
    thumbnail: Joi.string().uri().required().regex(httpRegExp),
    // owner: Joi.string().hex().required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().regex(rusRegExp), // russian words
    nameEN: Joi.string().required().regex(engRegExp), // english words
  }),
});

const validateMovieId = celebrate({
  body: Joi.object().keys({
    movieId: Joi.number().required(),
  }),
});

module.exports = {
  validateUserLogin,
  validateUserRegistration,
  validateUserUpdate,
  validateUserInfo,
  validateCreateMovie,
  validateMovieId,
};
