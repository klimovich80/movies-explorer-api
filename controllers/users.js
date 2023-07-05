const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const { errorHandler, OK_STATUS, CREATED_STATUS } = require('./errors');
const { SALT_ROUNDS, jwtSecretCheck } = require('../config');

// проверяет переданные в теле почту и пароль
// и возвращает JWT
const login = (req, res, next) => {
  const { email, password } = req.body;
  return userModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        jwtSecretCheck(),
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      errorHandler(err, next);
    });
};

// создаёт пользователя с переданными в теле
// email, password и name
const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, SALT_ROUNDS)
    .then((hash) => userModel.create({
      ...req.body,
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.status(CREATED_STATUS).send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => errorHandler(err, next));
};

// обновляет информацию о пользователе (email и имя)
const updateUser = (req, res, next) => {
  userModel.findByIdAndUpdate(req.user._id, {
    name: req.body.name,
    email: req.body.email,
  }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: false, // данные не будут валидированы перед изменением
  })
    .then((user) => res.status(OK_STATUS).send(user))
    .catch((err) => errorHandler(err, next));
};

// возвращает информацию о пользователе (email и имя)
const getUser = (req, res, next) => {
  userModel.findById(req.user._id)
    .then((user) => res.status(OK_STATUS).send(user))
    .catch((err) => errorHandler(err, next));
};

module.exports = {
  login, createUser, updateUser, getUser,
};
