// Importation des modules
import jwt from "jsonwebtoken";
import { encrypt } from "./crypto.js";

// Export de la fonction generateJWT
const generateJWT = (payload) => {
  const securePayload = {
    ...payload,
    password: encrypt(payload.password),
  };
  return jwt.sign(securePayload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export default generateJWT;
