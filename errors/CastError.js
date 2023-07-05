class CastError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CastError';
    this.code = 400;
  }
}

module.exports = CastError;
