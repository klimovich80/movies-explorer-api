const router = require('express').Router();
const {
  updateUser, getUser,
} = require('../controllers/users');
const {
  validateUserUpdate,
  validateUserInfo,
} = require('../middlewares/validate');

module.exports = router;
// обновляет информацию о пользователе (email и имя)
router.patch('/me', validateUserUpdate, updateUser);
// возвращает информацию о пользователе (email и имя)
router.get('/me', validateUserInfo, getUser);
