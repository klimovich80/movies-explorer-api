class UnathorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnathorizedError';
    this.code = 401;
  }
}

module.exports = UnathorizedError;
