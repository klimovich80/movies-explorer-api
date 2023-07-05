class NotOwnerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotOwnerError';
    this.code = 403;
  }
}

module.exports = NotOwnerError;
