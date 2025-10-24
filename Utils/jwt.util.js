// Importation des modules
import jwt from "jsonwebtoken";

// Export de la fonction generateJWT
export const generateJWT = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};
