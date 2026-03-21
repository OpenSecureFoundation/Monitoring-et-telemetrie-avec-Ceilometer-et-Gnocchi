// catchAsyncFn.js
/**
 * Wrapper pour fonctions async.
 * @param {Function} fn - fonction async à exécuter
 * @param {Object} options
 * @param {boolean} options.exitOnError - si true, fait process.exit(1) en cas d'erreur ; sinon relance l'erreur
 */
const catchAsyncFn = (fn, { exitOnError = false } = {}) => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      console.error(
        "🔴 [catchAsyncFn] Une erreur est survenue :",
        error.message
      );

      if (exitOnError) {
        console.error(
          "🔴 [catchAsyncFn] Process exit 1 en raison d'une erreur critique"
        );
        process.exit(1);
      }

      // relance l'erreur pour propagation
      throw error;
    }
  };
};

// Exportation par défaut du fichier (export principal)
export default catchAsyncFn;
