// Error formatter
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    // Pour garder une trace de l'origine de l'erreur
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
