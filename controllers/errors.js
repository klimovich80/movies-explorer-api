const { Error } = require('mongoose');
const UnhandledError = require('../errors/UnhandledError');
const CastError = require('../errors/CastError');
const DocumentNotFoundError = require('../errors/DocumentNotFoundError');
const DuplicateError = require('../errors/DuplicateError');
const UnathorizedError = require('../errors/UnauthorizedError');
const NotOwnerError = require('../errors/NotOwnerError');

const OK_STATUS = 200;
const CREATED_STATUS = 201;
const MONGO_DUPLICATE_ERROR = 11000;
const UNAUTHORIZED_ERROR = 401;
const NOT_OWNER_ERROR = 403;

const errorHandler = (err, next) => {
  console.log(err);
  if (err.code === MONGO_DUPLICATE_ERROR) {
    next(new DuplicateError('этот email уже используется, пожалуйста, выберите другой'));
  } else if (err instanceof Error.CastError) {
    next(new CastError(err.message));
  } else if (err instanceof Error.DocumentNotFoundError) {
    next(new DocumentNotFoundError('объект не найден'));
  } else if (err.code === UNAUTHORIZED_ERROR) {
    next(new UnathorizedError(err.message));
  } else if (err.code === NOT_OWNER_ERROR) {
    next(new NotOwnerError(err.message));
  }
  next(new UnhandledError('Что-то пошло не так с сервером: '));
};

module.exports = { errorHandler, OK_STATUS, CREATED_STATUS };
