// catchSync.js
/**
 * Wrapper pour fonctions synchrones.
 * @param {Function} fn - fonction synchrone à exécuter
 * @param {Object} options
 * @param {boolean} options.exitOnError - si true, fait process.exit(1) en cas d'erreur ; sinon relance l'erreur
 */
const catchSync = (fn, { exitOnError = false } = {}) => {
  return (...args) => {
    try {
      return fn(...args);
    } catch (error) {
      console.error("[catchSync] Une erreur est survenue :", error.message);

      if (exitOnError) {
        console.error(
          "[catchSync] Process exit 1 en raison d'une erreur critique"
        );
        process.exit(1);
      }

      // relance pour propagation
      throw error;
    }
  };
};

// Exportation par défaut du fichier (export principal)
export default catchSync;
