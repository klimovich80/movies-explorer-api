const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { validateUserLogin, validateUserRegistration } = require('../middlewares/validate');

// TODO убрать после ревью
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', validateUserLogin, login);

router.post('/signup', validateUserRegistration, createUser);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

module.exports = router;
