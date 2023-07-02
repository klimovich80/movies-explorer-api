const { Schema, model } = require('mongoose');
const { isURL } = require('validator');

const movieSchema = new Schema({

  // country — страна создания фильма. Обязательное поле-строка.
  country: {
    type: String,
    required: true,
  },
  // director — режиссёр фильма. Обязательное поле-строка.
  director: {
    type: String,
    required: true,
  },
  // duration — длительность фильма. Обязательное поле-число.
  duration: {
    type: Number,
    required: true,
  },
  // year — год выпуска фильма. Обязательное поле-строка.
  year: {
    type: Date,
    required: true,
  },
  // description — описание фильма. Обязательное поле-строка.
  description: {
    type: String,
    required: true,
  },
  // image — ссылка на постер к фильму. Обязательное поле-строка. Запишите её URL-адресом.
  image: {
    type: String,
    required: true,
    validate: {
      validator: (url) => isURL(url),
      message: 'Введите корректный URL адрес',
    },
  },
  // trailerLink — ссылка на трейлер фильма. Обязательное поле-строка. Запишите её URL-адресом.
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (url) => isURL(url),
      message: 'Введите корректный URL адрес',
    },
  },
  // thumbnail — миниатюрное изображение постера к фильму. Обязательное поле-строка.URL-адресом.
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (url) => isURL(url),
      message: 'Введите корректный URL адрес',
    },
  },
  // owner — _id пользователя, который сохранил фильм. Обязательное поле.
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  // movieId — id фильма, который содержится в ответе сервиса MoviesExplorer.
  // Обязательное поле в формате number.
  movieId: {
    type: Number,
    required: true,
  },
  // nameRU — название фильма на русском языке. Обязательное поле-строка.
  nameRU: {
    type: String,
    required: true,
  },
  // nameEN — название фильма на английском языке. Обязательное поле-строка.
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = model('movie', movieSchema);
