class DuplicateError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DuplicateError';
    this.code = 409;
  }
}

module.exports = DuplicateError;
