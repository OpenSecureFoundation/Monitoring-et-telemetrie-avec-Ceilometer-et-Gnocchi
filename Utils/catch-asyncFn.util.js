// catchAsyncFn.js
export const catchAsyncFn = (fn) => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      console.error("[catchAsyncFn] Une erreur est survenue :", error.message);
      throw error; // on relance l’erreur pour la propager au niveau supérieur
    }
  };
};
