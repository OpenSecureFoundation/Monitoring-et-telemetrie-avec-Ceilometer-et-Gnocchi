// middleware/validateRequest.js
const AppError = require("../Utils/Error-formatter.util");
/**
 * Middleware générique de validation de requêtes.
 * @param {object} schema - Le schéma de validation (ex: Joi, Yup, Zod...).
 * @param {string} [property="body"] - Partie de la requête à valider (body, params, query, headers).
 */
module.exports = (schema, property = "body") => {
  return async (req, res, next) => {
    try {
      if (!schema || typeof schema.validate !== "function") {
        return next(new AppError("Invalid or missing validation schema", 500));
      }

      // Exécuter la validation selon le schéma (support sync/async)
      const data = req[property];
      const result = schema.validate
        ? schema.validate(data, { abortEarly: false })
        : await schema.validate(data, { abortEarly: false });

      const error = result.error;

      if (error) {
        // Récupérer tous les messages de validation
        const messages = error.details
          ? error.details.map((d) => d.message).join(", ")
          : error.message || "Validation failed";

        return next(new AppError(messages, 422));
      }

      // Optionnel : on peut remplacer la donnée validée dans req
      if (result.value) req[property] = result.value;

      next(); // Tout est valide
    } catch (err) {
      console.error(`[Validation Middleware Error]: ${err.message}`);
      next(err); // ✅ Envoie proprement l’erreur au gestionnaire global
    }
  };
};
