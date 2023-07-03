const UnhandledError = require('../errors/UnhandledError');

module.exports = (err, req, res, next) => {
  const code = err.code || UnhandledError.code; // UnhandledError.code =  500
  const message = code === UnhandledError.code ? 'Внутренняя ошибка сервера' : err.message;
  res.status(code).send({ message });

  next();
};
