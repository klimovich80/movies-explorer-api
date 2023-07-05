require('dotenv').config();

const { PORT = 3000 } = process.env;
const { NODE_ENV, JWT_SECRET, DB_ADDRESS } = process.env;
const SALT_ROUNDS = 10;
const jwtSecretCheck = () => {
  const sw = 'sw123456789';

  if (!NODE_ENV) {
    return sw;
  }
  return NODE_ENV === 'production' ? JWT_SECRET : sw;
};

const dbCheck = () => {
  const db = 'mongodb://127.0.0.1:27017/bitfilmsdb';

  if (!NODE_ENV) {
    return db;
  }
  return NODE_ENV === 'production' ? DB_ADDRESS : db;
};

module.exports = {
  PORT, dbCheck, SALT_ROUNDS, jwtSecretCheck,
};
