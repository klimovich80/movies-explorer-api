const express = require('express');
const { connect } = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes/index');
const DocumentNotFoundError = require('./errors/DocumentNotFoundError');
const { PORT, DB_ADDRESS } = require('./config');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

connect(DB_ADDRESS)
  .then(() => console.log(`подключились к базе данных: ${DB_ADDRESS} \n`))
  .catch((err) => console.log('Ошибка подключения к базе данных: ', err.message));

app.use(cors());

app.use(express.json());

app.use(requestLogger);

app.use(router);

app.use(() => { throw new DocumentNotFoundError('страница не найдена'); });

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => console.log(`слушаем порт ${PORT}`));

module.exports = app;
