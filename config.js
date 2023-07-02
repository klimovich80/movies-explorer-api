require('dotenv').config();

const { PORT = 3000 } = process.env;
const { NODE_ENV, JWT_SECRET } = process.env;
const DB_ADDRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb';
const SALT_ROUNDS = 10;
const jwtSecretCheck = () => {
  const sw = 'sw123456789';

  if (!NODE_ENV) {
    return sw;
  }
  return NODE_ENV === 'production' ? JWT_SECRET : sw;
};

module.exports = {
  PORT, DB_ADDRESS, SALT_ROUNDS, jwtSecretCheck,
};
