class DocumentNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DocumentNotFoundError';
    this.code = 404;
  }
}

module.exports = DocumentNotFoundError;
