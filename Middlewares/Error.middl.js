// Error handler middleware
export default function handleError(err, req, res, next) {
  console.error("❗Erreur capturée :", err);

  console.log("Erreur reçue :", {
    message: err.message,
    statusCode: err.statusCode,
    status: err.status,
    isOperational: err.isOperational,
  });

  const isDev = process.env.NODE_ENV;

  // S'assurer que l'objet erreur a les propriétés minimales
  let statusCode = err.statusCode || 500;
  let status = err.status || "error";
  let message = err.message || "Internal Server Error";

  // Gérer les erreurs inattendues (non opérationnelles)
  if (!err.isOperational) {
    statusCode = 500;

    if (!isDev) {
      message = "An unexpected error has occurred.";
    }
  }

  const errorResponse = {
    status,
    message,
    ...(isDev && { stack: err.stack, error: err }),
  };

  console.log("💥 Réponse envoyée :", {
    statusCode,
    status,
    message,
  });

  console.log("💥 Réponse envoyée :", errorResponse);

  res.status(statusCode).json(errorResponse);
}
