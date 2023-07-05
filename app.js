const express = require('express');
const { connect } = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const router = require('./routes/index');
const { PORT, dbCheck } = require('./config');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/limiter');

const app = express();

connect(dbCheck())
  .then(() => console.log(`подключились к базе данных: ${dbCheck()} \n`))
  .catch((err) => console.log('Ошибка подключения к базе данных: ', err.message));

app.use(helmet());

app.use(limiter);

app.use(cors());

app.use(express.json());

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => console.log(`слушаем порт ${PORT}`));

module.exports = app;
