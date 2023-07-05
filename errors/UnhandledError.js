class UnhandledError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnhandledError';
    this.code = 500;
  }
}

module.exports = UnhandledError;
