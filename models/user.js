const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Это поле обязательно для заполнения, введите email в формате mail@mail.any'],
    unique: [true, 'Этот email {VALUE} уже есть в базе данных'],
    minlength: [2, 'Поле должно содержать минимум 2 символоа, вы ввели {VALUE}'],
    validate: {
      validator: (email) => isEmail(email),
      message: 'Email должен быть в формате me@there.any',
    },
  },
  password: {
    type: String,
    required: [true, 'Введите пароль'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Это поле обязательно для заполнения, введите имя'],
    minlength: [2, 'Поле должно содержать минимум 2 символоа, вы ввели {VALUE}'],
    maxlength: [30, 'Поле должно содержать максимум 30 символоа, вы ввели {VALUE}'],
  },
});

module.exports = model('user', userSchema);
